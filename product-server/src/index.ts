import { config } from "dotenv";
config({ path: "src/.env" });
import "reflect-metadata";

import express from "express";
import cors from "cors";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { PORT } from "./constants";
import { connectMySQL } from "./utils";

import { SwaggerConfig } from "./config/swagger";
import BaseRoute from "./api/routes/index.route";

(async () => {
    try {
        const app = express();

        await connectMySQL();
        console.log("DB Connected");

        app.use(express.json());
        app.use(cors());

        app.get("/", (req, res) => {
            res.send({ message: "Server is running" });
        });
        app.use("/api", BaseRoute);

        const swaggerDocs = swaggerJSDoc(SwaggerConfig);
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    } catch (error) {
        console.log("ERROR : ", error);
        process.exit(1);
    }
})();
