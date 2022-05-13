import { createClient, RedisClientType } from "redis";

import { ProductSchema } from "../types";

let instance: RedisProductModel;

const REDIS_URL = process.env.REDIS_URL || "";

class RedisProductModel {
    private client: RedisClientType;
    constructor() {
        if (instance) {
            throw new Error("Can not re instantiate");
        }
        instance = this;

        this.client = createClient({
            url: REDIS_URL,
        });
        this.client.on("error", (err) => {
            console.log("Error " + err);
        });
    }

    async connect() {
        if (!this.client.isOpen) {
            await this.client.connect();
        }
    }

    async disconnect() {
        if (this.client.isOpen) {
            await this.client.quit();
        }
    }

    async setProduct(product: ProductSchema) {
        await this.connect();

        await this.client.hSet(product.id, "id", product.id);
        await this.client.hSet(product.id, "name", product.name);
        await this.client.hSet(product.id, "price", product.price);
        await this.client.hSet(product.id, "category", product.category);
    }

    async getProduct(id: string) {
        await this.connect();
        const data1 = await this.client.hGetAll(id);
        const data2: ProductSchema = JSON.parse(JSON.stringify(data1));

        return data2;
    }

    async deleteProduct(id: string) {
        await this.connect();

        return !!(await this.client.del(id));
    }
}

const redisProductModel = Object.freeze(new RedisProductModel());
export default redisProductModel;
