import { Router } from "express";

import productRoute from "./product.route";

class BaseRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.mountRoutes();
    }

    private mountRoutes() {
        this.router.use("/product", productRoute);
    }
}

export = new BaseRouter().router;
