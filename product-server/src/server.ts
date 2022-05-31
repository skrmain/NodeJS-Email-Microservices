import "reflect-metadata";
import express, { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import { SwaggerConfig } from "./config/swagger";
import BaseRouter from "./api/routes/index.route";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.setUpConfiguration();
    }

    private setUpConfiguration(): void {
        this.app.use(cors());
        this.app.use(express.static("public"));
        this.app.use(express.json());

        this.app.get("/", (req, res) => {
            res.send({ message: "Server is running" });
        });

        this.app.use("/api", BaseRouter);

        const swaggerDocs = swaggerJSDoc(SwaggerConfig);
        this.app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocs)
        );
    }
}

export default new App().app;
