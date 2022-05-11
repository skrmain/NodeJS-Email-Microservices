import { join } from "path";
import { createConnection } from "typeorm";

export const connectMySQL = () => {
    const entitiesPath = join(__dirname, "../entities/*.ts");

    return createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "admin",
        database: "learning",
        entities: [entitiesPath],
        synchronize: true,
        logging: false,
    });
};
