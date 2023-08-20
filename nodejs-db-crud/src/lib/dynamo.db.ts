import {
    CreateTableInput,
    ListTablesCommand,
    QueryCommand,
    QueryCommandInput,
    CreateTableCommand,
    DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
    DeleteCommand,
    DeleteCommandInput,
    DynamoDBDocumentClient,
    PutCommand,
    PutCommandInput,
    ScanCommand,
    TranslateConfig,
} from '@aws-sdk/lib-dynamodb';

const AWS_REGION = process.env.AWS_REGION || 'ap-south-1';

let instance: DynamoDatabaseOperations;

export class DynamoDatabaseOperations {
    private client: DynamoDBClient;
    private docClient: DynamoDBDocumentClient;
    private translateConfig: TranslateConfig = {
        marshallOptions: {
            convertEmptyValues: false,
            removeUndefinedValues: false,
            convertClassInstanceToMap: false,
        },
        unmarshallOptions: {
            wrapNumbers: false,
        },
    };
    constructor() {
        if (instance) {
            throw new Error("Can't re instantiate");
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        instance = this;

        this.client = new DynamoDBClient({
            region: AWS_REGION,
            endpoint: 'http://localhost:8000',
        });
        this.docClient = DynamoDBDocumentClient.from(this.client, this.translateConfig);
    }

    async listTables() {
        const command = new ListTablesCommand({});
        const result = await this.client.send(command);

        return result.TableNames || [];
    }

    private async createTable(tableSchema: CreateTableInput) {
        const command = new CreateTableCommand(tableSchema);
        const result = await this.client.send(command);

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

        await this.docClient.send(command);
    }

    async getAllItems(tableName: string) {
        const command = new ScanCommand({ TableName: tableName });
        const result = await this.docClient.send(command);

        return { Items: result.Items, Count: result.Count };
    }

    async deleteItem({ TableName, Key }: DeleteCommandInput) {
        const command = new DeleteCommand({ TableName, Key });
        const result = await this.docClient.send(command);

        // TODO: Check what is the difference in response if item is not there
        return result;
    }

    async queryItem(query: QueryCommandInput) {
        const command = new QueryCommand(query);
        const result = await this.docClient.send(command);

        return { Items: result.Items, Count: result.Count };
    }
}

const dynamoDB = Object.freeze(new DynamoDatabaseOperations());
export default dynamoDB;
