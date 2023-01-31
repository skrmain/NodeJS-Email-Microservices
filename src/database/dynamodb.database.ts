import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, TranslateConfig } from '@aws-sdk/lib-dynamodb';

const REGION = 'ap-south-1';

export class DynamoDatabase {
    private _client: DynamoDBClient | undefined;
    private _docClient: DynamoDBDocumentClient | undefined;
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

    public getClient() {
        if (!this._client) {
            this._client = new DynamoDBClient({
                region: REGION,
                endpoint: 'http://localhost:8000',
            });
        }

        return this._client;
    }

    public getDocumentClient() {
        if (!this._docClient) {
            this._docClient = DynamoDBDocumentClient.from(this.getClient(), this.translateConfig);
        }

        return this._docClient;
    }
}
