import redisProductModel from './database/redis.model';

import { ProductSchema } from './types';

(async () => {
    const p1: ProductSchema = {
        category: 'mobile',
        id: '1',
        name: 'Apple iPhone',
        price: '50000',
    };
    const p2: ProductSchema = {
        category: 'electronics',
        id: '2',
        name: 'Apple iMac',
        price: '200000',
    };
    try {
        await redisProductModel.setProduct(p1);
        await redisProductModel.setProduct(p2);

        const product1 = await redisProductModel.getProduct('1');
        // const product2 = await redisProductModel.getProduct("2");

        console.log('A', product1);
    } catch (error) {
        console.log('Error ', error);
    }
    // console.log("B", product2);
    // console.log(await redisProductModel.deleteProduct("1"));
})();
