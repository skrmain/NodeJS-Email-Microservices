import redisProductModel from './database/redis.database';
import { ProductSchema } from './types';
import { DynamoDatabaseOperations } from './database-operations/dynamodb.operations';
import { ProductSchemaDDB, TABLE_NAME } from './schema/product.schema';
import { Products } from './data/product.data';

async () => {
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
};

// - DynamoDB

(async () => {
    const dynamoOperations = new DynamoDatabaseOperations();

    const tablesCreated = await dynamoOperations.createTables([ProductSchemaDDB]);
    console.log('Tables Created ', tablesCreated);
    const tablesList = await dynamoOperations.listTables();
    console.log('Tables List ', tablesList);

    // for (const product of Products) {
    //     await dynamoOperations.updateOrAddItem({ TableName: TABLE_NAME, Item: { ...product } });
    // }
    // console.log('Item saved/updated ', Products.length);

    const items = await dynamoOperations.getAllItems(TABLE_NAME);
    console.log('Items ', items);

    // const deletedItem = await dynamoOperations.deleteItem({ TableName: TABLE_NAME, Key: { dateEdited: '1675094632790', Id: 'shs3vq' } });
    // console.log('Deleted Item ', deletedItem);

    const queryItem = await dynamoOperations.queryItem({
        TableName: TABLE_NAME,
        ExpressionAttributeValues: { ':id': { S: 'rldzkv' }, ':de': { S: '1675094632790' } },
        KeyConditionExpression: 'Id = :id and dateEdited >= :de',
    });
    console.log('Queried Items ', queryItem);
})();
