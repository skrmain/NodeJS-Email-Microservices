import { Router } from "express";

import productRoute from "./product.route";
import UserRoutes from "./user.route";

class BaseRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.mountRoutes();
    }

    private mountRoutes() {
        this.router.use("/product", productRoute);
        this.router.use("/user", UserRoutes);
    }
}

export = new BaseRouter().router;
