import { config } from "dotenv";
config({ path: "src/.env" });
import "reflect-metadata";

import express from "express";

import { PORT } from "./constants";
import { connectMySQL } from "./utils";

import ProductRoutes from "./api/routes/product.route";
import UserRoutes from "./api/routes/user.route";

(async () => {
    try {
        const app = express();

        await connectMySQL();
        console.log("DB Connected");

        app.use(express.json());

        app.get("/", (req, res) => {
            res.send({ message: "Server is running" });
        });
        app.use("/api/user", UserRoutes);
        app.use("/api/product", ProductRoutes);

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    } catch (error) {
        console.log("ERROR : ", error);
        process.exit(1);
    }
})();
