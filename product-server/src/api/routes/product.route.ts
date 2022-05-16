import { Request, Response, Router } from "express";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

class ProductRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.mountRoutes();
    }

    async addNewProductsService(req: Request, res: Response) {
        const savedProduct = await productService.addNewProductsService(
            req.body
        );

        return res.send({
            message: "product saved",
            status: "success",
            data: savedProduct,
        });
    }

    async getAllProductsService(req: Request, res: Response) {
        const products = await productService.getAllProductsService();
        return res.send({
            message: "product list",
            status: "success",
            data: products,
        });
    }

    async getOneProductService(req: Request, res: Response) {
        const product = await productService.getOneProductService(
            req.params.id
        );
        return res.send({
            message: "product detail",
            status: "success",
            data: product,
        });
    }

    async updateProductsService(req: Request, res: Response) {
        const savedProduct = await productService.updateProductsService(
            req.body,
            req.params.id
        );

        return res.send({
            message: "product updated",
            status: "success",
            data: savedProduct,
        });
    }

    async deleteProductsService(req: Request, res: Response) {
        const deletedInfo = await productService.deleteProductsService(
            req.params.id
        );

        return res.send({
            message: "product deleted",
            status: "success",
            data: deletedInfo,
        });
    }

    private mountRoutes() {
        this.router.post("/", this.addNewProductsService);
        this.router.get("/", this.getAllProductsService);
        this.router.get("/:id", this.getOneProductService);
        this.router.patch("/:id", this.updateProductsService);
        this.router.delete("/:id");
    }
}

export = new ProductRouter().router;
