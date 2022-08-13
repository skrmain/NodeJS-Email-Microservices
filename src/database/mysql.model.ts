import { Connection, createConnection } from 'mysql';

const con = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'learning',
});

const connectDB = (con: Connection) => {
    return new Promise((resolve: any, reject: any) => {
        con.connect((err, data) => {
            if (err) {
                return reject(err);
            }

            resolve(data);
        });
    });
};

const query = (con: Connection, sql: string) => {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const createProductTable = (con: Connection) => {
    const sql = `CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price FLOAT,
    category VARCHAR(255)
  );`;
    return query(con, sql);
};

const addProduct = (con: Connection) => {
    const sql = `INSERT INTO products (name, price, category) 
  VALUES ('Apple iMac', 200000, 'smartphone');`;
    return query(con, sql);
};

const getAll = (con: Connection) => {
    const sql = 'SELECT * FROM products;';
    return query(con, sql);
};

const getProduct = (con: Connection, id: number) => {
    const sql = `SELECT * FROM products WHERE id = ${id};`;
    return query(con, sql);
};

interface Product {
    name: string;
    price: number;
    category: string;
}

const updateProduct = (con: Connection, id: number, product: Product) => {
    const sql = `UPDATE products SET 
      name='${product.name}', 
      price=${product.price}, 
      category='${product.category}' 
      WHERE id = ${id};`;
    return query(con, sql);
};

const deleteProduct = (con: Connection, id: number) => {
    const sql = `DELETE FROM products WHERE id = ${id};`;
    return query(con, sql);
};

const closeConnection = (con: Connection) => {
    return new Promise((resolve, reject) => {
        con.end((err) => {
            if (err) reject(err);

            resolve('Connection Closed');
        });
    });
};

(async () => {
    try {
        await connectDB(con);
        console.log('DB Connected');

        // const result = await createProductTable(con);
        // console.log("Result ", result);

        // const result = await addProduct(con);
        // console.log("Result ", result);

        // const result = await getAll(con);
        // console.log("Result ", result);

        // const result = await getProduct(con, 1);
        // console.log("Result ", result);

        // const result = await updateProduct(con, 1, {
        //   name: "Apple iMac",
        //   price: 210000,
        //   category: "computer",
        // });
        // console.log("Result ", result);

        // const result = await deleteProduct(con, 1);
        // console.log("Result ", result);
    } catch (error) {
        console.log('Error ', error);
    } finally {
        const result = await closeConnection(con);
        console.log(result);
    }
})();

// connection.connect((conn) => {
//   console.log("DB Connected");
// });

// import { promisify } from "util";
// const connectDB = promisify(connection.connect);
