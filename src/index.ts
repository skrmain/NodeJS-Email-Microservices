import redisDB from './lib/redis.db';
import { DynamoDatabaseOperations } from './database-operations/dynamodb.operations';
import { ProductSchemaDDB, TABLE_NAME } from './schema/product.schema';

(async () => {
    await redisDB.hSetValue('1', 'name', 'rohan');
    const result = await redisDB.getValue({ key: '1', type: 'htype' });
    console.log('Get', result);
})();

// - DynamoDB

async () => {
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
};
