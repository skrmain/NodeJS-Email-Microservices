import { createConnection } from "mysql";

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "learning",
});

connection.connect((conn) => {
  console.log("DB Connected");
});
