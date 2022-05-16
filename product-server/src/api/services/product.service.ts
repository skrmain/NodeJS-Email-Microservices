import { Request, Response } from "express";
import { getManager } from "typeorm";

import { Product } from "../../entity/product.entity";

export class ProductService {
    async getOneProductService(id: any) {
        const productRepository = getManager().getRepository(Product);

        const product = await productRepository.findOne(id);
        return product;
    }

    async getAllProductsService() {
        const productRepository = getManager().getRepository(Product);

        const products = await productRepository.find();

        return products;
    }

    async addNewProductsService(data: any) {
        const productRepository = getManager().getRepository(Product);

        // Add incoming data validation
        // const data = req.body;

        const p1 = new Product();
        console.log("Da ", data);

        p1.name = data.name;
        p1.price = data.price;
        p1.category = data.category;
        p1.description = data.description;

        const savedProduct = await productRepository.save(p1);

        return savedProduct;
    }

    async updateProductsService(data: any, id: any) {
        const productRepository = getManager().getRepository(Product);

        // Add incoming data validation

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

        return savedProduct;
    }

    deleteProductsService = async (id: any) => {
        const productRepository = getManager().getRepository(Product);

        const deletedInfo = await productRepository.delete(id);

        return deletedInfo;
    };
}
