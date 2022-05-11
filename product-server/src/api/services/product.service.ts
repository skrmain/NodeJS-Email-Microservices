import { Request, Response } from "express";
import { getManager } from "typeorm";

import { Product } from "../../entities/product.entity";

export const GetOneProductService = async (req: Request, res: Response) => {
    const productRepository = getManager().getRepository(Product);

    const id = req.params.id;

    const product = await productRepository.findOne(id);

    res.send({ message: "product detail", status: "success", data: product });
};

export const GetAllProductsService = async (req: Request, res: Response) => {
    const productRepository = getManager().getRepository(Product);

    const products = await productRepository.find();

    res.send({ message: "product list", status: "success", data: products });
};

export const AddNewProductsService = async (req: Request, res: Response) => {
    const productRepository = getManager().getRepository(Product);

    // Add incoming data validation
    const data = req.body;

    const p1 = new Product();
    console.log("Da ", data);

    p1.name = data.name;
    p1.price = data.price;
    p1.category = data.category;
    p1.description = data.description;

    const savedProduct = await productRepository.save(p1);

    res.send({
        message: "product saved",
        status: "success",
        data: savedProduct,
    });
};

export const UpdateProductsService = async (req: Request, res: Response) => {
    const productRepository = getManager().getRepository(Product);

    // Add incoming data validation
    const data = req.body;
    const id = req.params.id;

    const p1 = new Product();
    console.log("Da ", data);

    if (data.name) {
        p1.name = data.name;
    }
    if (data.price) {
        p1.price = data.price;
    }
    if (data.category) {
        p1.category = data.category;
    }
    if (data.description) {
        p1.description = data.description;
    }

    const savedProduct = await productRepository.update(id, p1);

    res.send({
        message: "product updated",
        status: "success",
        data: savedProduct,
    });
};

export const DeleteProductsService = async (req: Request, res: Response) => {
    const productRepository = getManager().getRepository(Product);

    const id = req.params.id;

    const savedProduct = await productRepository.delete(id);

    res.send({
        message: "product deleted",
        status: "success",
        data: savedProduct,
    });
};
