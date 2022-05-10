import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "./entity/User";
import { Product } from "./entity/Product";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "learning",
    synchronize: true,
    logging: false,
    entities: [User, Product],
    migrations: [],
    subscribers: [],
});
