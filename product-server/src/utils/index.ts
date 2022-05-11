import { join } from "path";
import { createConnection } from "typeorm";

export const connectMySQL = () => {
    const entityPath = join(__dirname, "../entity/*.ts");

    return createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "admin",
        database: "learning",
        entities: [entityPath],
        synchronize: true,
        logging: false,
    });
};
