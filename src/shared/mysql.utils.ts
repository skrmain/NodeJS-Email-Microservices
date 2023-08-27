import { Connection, createConnection } from 'mysql2/promise';

export class Database {
    private static _connection?: Connection;
    static dbName: string;

    static async connect(name: string) {
        this._connection = await createConnection({
            host: 'localhost',
            user: 'root',
            password: 'admin',
            database: 'test',
        });
        this.dbName = name;
    }

    static disconnect() {
        return this._connection?.end();
    }

    static get connection() {
        if (this._connection) return this._connection;

        throw new Error('DB Not Connected');
    }
}

interface DatabaseOperationOptions {
    page?: number;
    pageSize?: number;
    sortBy?: 'name' | 'email' | 'id';
    sortOrder?: 'asc' | 'desc';
    searchText?: string;
    searchField?: 'name' | 'email' | 'id';
}

export class DatabaseOperation {
    private _tableName: string | undefined;
    private _connection: Connection;
    private _dbName: string;
    constructor(connection: Connection, dbName: string, table: string) {
        this._connection = connection;
        this._dbName = dbName;
        this._tableName = table;
    }

    private _execute(query: string) {
        return this._connection.execute(query);
    }

    getMany(options?: DatabaseOperationOptions) {
        let query = `SELECT * FROM ${this._dbName}.${this._tableName}`;
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

    getOne(filter: any) {
        let query = `SELECT * FROM ${this._dbName}.${this._tableName}`;
        query += `LIMIT 1`;

        return this._execute(query);
    }

    insertOne(data: object) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).join("', '");
        const query = `INSERT INTO ${this._dbName}.${this._tableName} (${columns}) VALUES ('${values}');`;

        return this._execute(query);
    }

    insertMany(data: object[]) {
        if (data.length < 0) {
            return [];
        }
        const columns = Object.keys(data[0]).join(', ');
        const values = data.map((v) => Object.values(v).join("', '")).join("'), ('");
        const query = `INSERT INTO ${this._dbName}.${this._tableName} (${columns}) VALUES ('${values}');`;

        return this._execute(query);
    }
}
