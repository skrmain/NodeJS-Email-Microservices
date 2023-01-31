import {
    CreateTableInput,
    ListTablesCommand,
    QueryCommand,
    QueryCommandInput,
    CreateTableCommand,
} from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DeleteCommandInput, PutCommand, PutCommandInput, ScanCommand } from '@aws-sdk/lib-dynamodb';

import { DynamoDatabase } from '../database/dynamodb.database';

export class DynamoDatabaseOperations {
    private dbClient;
    private dbDocClient;
    constructor() {
        const dynamoDatabase = new DynamoDatabase();
        this.dbClient = dynamoDatabase.getClient();
        this.dbDocClient = dynamoDatabase.getDocumentClient();
    }

    async listTables() {
        const command = new ListTablesCommand({});
        const result = await this.dbClient.send(command);

        return result.TableNames || [];
    }

    private async createTable(tableSchema: CreateTableInput) {
        const command = new CreateTableCommand(tableSchema);
        const result = await this.dbClient.send(command);

        return result.TableDescription;
    }

    async createTables(tableSchemas: CreateTableInput[]) {
        const tableList = await this.listTables();
        const tablesToCreate = tableSchemas.filter((schema) => !tableList.includes(schema.TableName || ''));

        for (const tableSchema of tablesToCreate) {
            const result = await this.createTable(tableSchema);
            console.log('Table Created ', result?.TableName);
        }

        return tablesToCreate.length;
    }

    async updateOrAddItem({ TableName, Item }: PutCommandInput) {
        const command = new PutCommand({ TableName, Item });

        await this.dbDocClient.send(command);
    }

    async getAllItems(tableName: string) {
        const command = new ScanCommand({ TableName: tableName });
        const result = await this.dbDocClient.send(command);

        return { Items: result.Items, Count: result.Count };
    }

    async deleteItem({ TableName, Key }: DeleteCommandInput) {
        const command = new DeleteCommand({ TableName, Key });
        const result = await this.dbDocClient.send(command);

        // TODO: Check what is the difference in response if item is not there
        return result;
    }

    async queryItem(query: QueryCommandInput) {
        const command = new QueryCommand(query);
        const result = await this.dbDocClient.send(command);

        return { Items: result.Items, Count: result.Count };
    }
}
