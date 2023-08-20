import redisDB from './lib/redis.db';
import dynamoDB from './lib/dynamo.db';
import { ProductSchemaDDB, TABLE_NAME } from './schema/product.schema';

async () => {
    await redisDB.hSetValue('1', 'name', 'rohan');
    const result = await redisDB.getValue({ key: '1', type: 'htype' });
    console.log('Get', result);
};

(async () => {
    const tablesCreated = await dynamoDB.createTables([ProductSchemaDDB]);
    console.log('Tables Created ', tablesCreated);
    const tablesList = await dynamoDB.listTables();
    console.log('Tables List ', tablesList);

    // for (const product of Products) {
    //     await dynamoDB.updateOrAddItem({ TableName: TABLE_NAME, Item: { ...product } });
    // }
    // console.log('Item saved/updated ', Products.length);

    const items = await dynamoDB.getAllItems(TABLE_NAME);
    console.log('Items ', items);

    // const deletedItem = await dynamoDB.deleteItem({ TableName: TABLE_NAME, Key: { dateEdited: '1675094632790', Id: 'shs3vq' } });
    // console.log('Deleted Item ', deletedItem);

    const queryItem = await dynamoDB.queryItem({
        TableName: TABLE_NAME,
        ExpressionAttributeValues: { ':id': { S: 'rldzkv' }, ':de': { S: '1675094632790' } },
        KeyConditionExpression: 'Id = :id and dateEdited >= :de',
    });
    console.log('Queried Items ', queryItem);
})();
