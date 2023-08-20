import { Connection, createConnection } from 'mysql2/promise';

export class DatabaseConnection {
    private connection: Connection | undefined;

    private async connect() {
        const con = await createConnection({
            host: 'localhost',
            user: 'root',
            password: 'admin',
            database: 'test',
        });

        this.connection = con;
    }

    async getConnection() {
        if (!this.connection) {
            await this.connect();
        }
        return this.connection;
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
    tableName: string | undefined;
    constructor(table: string) {
        this.tableName = table;
    }

    getAll(con: Connection, database: string, options?: DatabaseOperationOptions) {
        let query = `SELECT * FROM ${database}.${this.tableName}`;
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
        return con.execute(query);
    }

    insertOne(con: Connection, database: string, data: object) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).join("', '");
        const query = `INSERT INTO ${database}.${this.tableName} (${columns}) VALUES ('${values}');`;

        return con.execute(query);
    }

    insertMany(con: Connection, database: string, data: object[]) {
        if (data.length < 0) {
            return [];
        }
        const columns = Object.keys(data[0]).join(', ');
        const values = data.map((v) => Object.values(v).join("', '")).join("'), ('");
        const query = `INSERT INTO ${database}.${this.tableName} (${columns}) VALUES ('${values}');`;

        return con.execute(query);
    }
}

// const connectDB = (con: Connection) => {
//     return new Promise((resolve: any, reject: any) => {
//         con.connect((err, data) => {
//             if (err) {
//                 return reject(err);
//             }

//             resolve(data);
//         });
//     });
// };

// const query = (con: Connection, sql: string) => {
//     return new Promise((resolve, reject) => {
//         con.query(sql, (err, result) => {
//             if (err) reject(err);
//             resolve(result);
//         });
//     });
// };

// const createProductTable = (con: Connection) => {
//     const sql = `CREATE TABLE products (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255),
//     price FLOAT,
//     category VARCHAR(255)
//   );`;
//     return query(con, sql);
// };

// const addProduct = (con: Connection) => {
//     const sql = `INSERT INTO products (name, price, category)
//   VALUES ('Apple iMac', 200000, 'smartphone');`;
//     return query(con, sql);
// };

// const getAll = (con: Connection) => {
//     const sql = 'SELECT * FROM products;';
//     return query(con, sql);
// };

// const getProduct = (con: Connection, id: number) => {
//     const sql = `SELECT * FROM products WHERE id = ${id};`;
//     return query(con, sql);
// };

// interface Product {
//     name: string;
//     price: number;
//     category: string;
// }

// const updateProduct = (con: Connection, id: number, product: Product) => {
//     const sql = `UPDATE products SET
//       name='${product.name}',
//       price=${product.price},
//       category='${product.category}'
//       WHERE id = ${id};`;
//     return query(con, sql);
// };

// const deleteProduct = (con: Connection, id: number) => {
//     const sql = `DELETE FROM products WHERE id = ${id};`;
//     return query(con, sql);
// };

// const closeConnection = (con: Connection) => {
//     return new Promise((resolve, reject) => {
//         con.end((err) => {
//             if (err) reject(err);

//             resolve('Connection Closed');
//         });
//     });
// };

// (async () => {
//     try {
//         // await connectDB(con);
//         // console.log('DB Connected');

//         // const result = await createProductTable(con);
//         // console.log("Result ", result);

//         // const result = await addProduct(con);
//         // console.log("Result ", result);

//         // const result = await getAll(con);
//         // console.log("Result ", result);

//         // const result = await getProduct(con, 1);
//         // console.log("Result ", result);

//         // const result = await updateProduct(con, 1, {
//         //   name: "Apple iMac",
//         //   price: 210000,
//         //   category: "computer",
//         // });
//         // console.log("Result ", result);

//         // const result = await deleteProduct(con, 1);
//         // console.log("Result ", result);
//     } catch (error) {
//         console.log('Error ', error);
//     } finally {
//         // const result = await closeConnection(con);
//         // console.log(result);
//     }
// })();

// connection.connect((conn) => {
//   console.log("DB Connected");
// });

// import { promisify } from "util";
// const connectDB = promisify(connection.connect);

// CREATE DATABASE test;

// USE test;

// CREATE TABLE student (
//   name VARCHAR(20),
//   rollno INT
// );

// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'test',
// });

// conn.connect((err) => {
//     conn.query(`show tables;`, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         conn.end();
//     });
// });
