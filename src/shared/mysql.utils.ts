import { Connection, createConnection } from 'mysql2/promise';

export class DatabaseOperation {
    private _connection?: Connection;
    dbName?: string;

    async connect(name: string) {
        if (this._connection) {
            await this._connection.ping();
            return;
        }
        this._connection = await createConnection({
            host: 'localhost',
            user: 'root',
            password: 'admin',
            database: 'test',
        });
        this.dbName = name;
    }

    execute(query: string) {
        if (this._connection) {
            return this._connection.execute(query);
        }

        throw new Error('DB Not Connected');
    }

    disconnect() {
        if (this._connection) {
            const _conn = this._connection;
            this._connection = undefined;
            this.dbName = undefined;
            return _conn.end();
        }
        throw new Error('DB Not Connected');
    }

    get connection() {
        if (this._connection) return this._connection;

        throw new Error('DB Not Connected');
    }
}

export const database = new DatabaseOperation();

interface DatabaseOperationOptions {
    page?: number;
    pageSize?: number;
    sortBy?: 'name' | 'email' | 'id';
    sortOrder?: 'asc' | 'desc';
    searchText?: string;
    searchField?: 'name' | 'email' | 'id';
}

export class TableOperation<T extends object> {
    protected _tableName: string;
    protected _database: DatabaseOperation;
    protected _tableSchema?: string;
    constructor(database: DatabaseOperation, table: string, tableSchema?: string) {
        this._database = database;
        this._tableName = table;
        this._tableSchema = tableSchema;
        // this._createTable();
    }

    private async _execute(query: string): Promise<any> {
        const [result] = await this._database.execute(query);

        return result;
    }

    private async _createTable() {
        if (this._tableSchema) {
            const createdTable = await this.getTable();
            if (createdTable) {
                return true;
            }
            await this._database.execute(this._tableSchema);
            return true;
        }
    }

    async getTable() {
        try {
            return await this._execute(`describe ${this._tableName};`);
        } catch (error) {
            return null;
        }
    }

    setup() {
        return this._createTable();
    }

    getMany(options?: DatabaseOperationOptions): Promise<Partial<T[]>> {
        let query = `SELECT * FROM ${this._database.dbName}.${this._tableName}`;
        if (options?.searchText && options.searchField) {
            const { searchText, searchField } = options;
            query += ` WHERE ${searchField} LIKE '%${searchText}%'`;
        }
        if (options?.sortBy && options.sortOrder) {
            const { sortBy, sortOrder } = options;
            query += ` ORDER BY ${sortBy} ${sortOrder}`;
        }
        if (options?.page && options.pageSize) {
            const { page, pageSize } = options;
            query += ` LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize};`;
        }
        return this._execute(query);
    }

    getOne(filter = {}): Promise<Partial<T>> {
        let query = `SELECT * FROM ${this._database.dbName}.${this._tableName}`;
        query += ` LIMIT 1`;

        return this._execute(query);
    }

    insertOne(data: T) {
        const columns = Object.keys(data).join(', ');
        let values = '';
        Object.values(data).forEach((_v) => (values += typeof _v === 'string' ? `'${_v}',` : `${_v},`));
        if (values.endsWith(',')) {
            values = values.slice(0, values.length - 1);
        }

        const query = `INSERT INTO ${this._database.dbName}.${this._tableName} (${columns}) VALUES (${values});`;

        return this._execute(query);
    }

    insertMany(data: object[]) {
        if (data.length < 0) {
            return [];
        }
        const columns = Object.keys(data[0]).join(', ');
        const values = data.map((v) => Object.values(v).join("', '")).join("'), ('");
        const query = `INSERT INTO ${this._database.dbName}.${this._tableName} (${columns}) VALUES ('${values}');`;

        return this._execute(query);
    }
}
