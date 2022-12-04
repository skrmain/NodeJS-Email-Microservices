import redisProductModel from './database/redis.database';
import { ProductSchema } from './types';
import { listTables } from './utils/dynamodb.util';

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

// - DynamoDB

export const run = async () => {
    try {
        // const result = await createTable();
        // console.log("Table Created", result.TableDescription?.TableName);

        const dbTables = await listTables();
        console.log('DB Tables ', dbTables.TableNames);

        // for (const product of Products) {
        //   const savedItem = await updateOrAddItem({ ...product });
        //   console.log("Saved Item: ", savedItem);
        // }

        // const item = await getAllItems();
        // console.log("Item ", item.Items);

        // const deletedItem = await deleteItem("m1v930", "1653368519448");
        // console.log("Deleted Item ", deletedItem);

        // // - Query Command
        // const result = await ddbDocClient.send(
        //   new QueryCommand({
        //     TableName: TABLE_NAME,
        //     ExpressionAttributeValues: {
        //       ":id": "5q6rk5",
        //       ":de": "16533685194",
        //     },
        //     KeyConditionExpression: "Id = :id and dateEdited >= :de",
        //     // ProjectionExpression: "",
        //   })
        // );
        // console.log("Result ", result);
    } catch (err) {
        console.log('Error', err);
    }
};
// run();
