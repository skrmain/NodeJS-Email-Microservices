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
        this.router.post("", this.addNewProductsService);
        this.router.get("", this.getAllProductsService);
        this.router.get("/:id", this.getOneProductService);
        this.router.patch("/:id", this.updateProductsService);
        this.router.delete("/:id", this.deleteProductsService);
    }
}

export = new ProductRouter().router;

/**
 * @swagger
 * /api/product/{id}:
 *  get:
 *   summary: get product info
 *   description: api to get the detail of a product
 *   tags: [Get detail by id]
 *   consumes:
 *      application/json
 *   produce:
 *      application/json
 *   parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *   responses:
 *    '200':
 *      description: success
 */

/**
 * @swagger
 * /api/product:
 *  get:
 *   summary: get products
 *   description: api to get products
 *   tags: [Get Products]
 *   consumes:
 *      application/json
 *   produce:
 *      application/json
 *   responses:
 *    '200':
 *      description: success
 */

/**
 * @swagger
 * /api/product:
 *  post:
 *   summary: add new product
 *   description: api to add new product
 *   tags: [Add New]
 *   consumes:
 *      application/json
 *   produce:
 *      application/json
 *   requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         name:
 *          type: string
 *         price:
 *          type: number
 *         category:
 *          type: string
 *         description:
 *          type: string
 *   responses:
 *    '200':
 *      description: success
 */

/**
 * @swagger
 * /api/product/{id}:
 *  patch:
 *   summary: update product by id
 *   description: api to update the product details
 *   tags: [Update Product by id]
 *   consumes:
 *      application/json
 *   produce:
 *      application/json
 *   parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *   requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         name:
 *          type: string
 *         price:
 *          type: number
 *         category:
 *          type: string
 *         description:
 *          type: string
 *   responses:
 *    '200':
 *      description: success
 */

/**
 * @swagger
 * /api/product/{id}:
 *  delete:
 *   summary: delete product by id
 *   description: api to delete the product details
 *   tags: [Delete Product by id]
 *   consumes:
 *      application/json
 *   produce:
 *      application/json
 *   parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *   responses:
 *    '200':
 *      description: success
 */
