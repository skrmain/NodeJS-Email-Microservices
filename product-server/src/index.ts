import "reflect-metadata";
import { config } from "dotenv";
config({ path: "src/.env" });

import express from "express";

import { PORT } from "./constants";
import ProductRoutes from "./api/routes/product.route";
import UserRoutes from "./api/routes/user.route";
import { connectMySQL } from "./utils";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send({ message: "Server is running" });
});

(async () => {
    try {
        await connectMySQL();
        console.log("DB Connected");

        app.use("/api/user", UserRoutes);
        app.use("/api/product", ProductRoutes);

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    } catch (error) {
        console.log("ERROR : ", error);
    }
})();
