import {
    CreateTableCommand,
    ListTablesCommand,
} from '@aws-sdk/client-dynamodb';
import { DeleteCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

import { ddbClient, ddbDocClient } from './../database/dynamodb';
import { ProductSchemaDDB, TABLE_NAME } from '../schema/product.schema';
import { ProductType } from '../types/product.type';

export const createTable = async () => {
    return await ddbClient.send(new CreateTableCommand(ProductSchemaDDB));
};

export const listTables = async () => {
    return await ddbClient.send(new ListTablesCommand({}));
};

export const updateOrAddItem = async ({
    Id,
    category,
    name,
    price,
    dateEdited,
}: ProductType) => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            Id,
            category,
            name,
            price,
            dateEdited,
        },
    };
    return ddbDocClient.send(new PutCommand(params));
};

export const getAllItems = async () => {
    return await ddbDocClient.send(
        new ScanCommand({
            TableName: TABLE_NAME,
        })
    );
};

export const deleteItem = async (Id: string, dateEdited: string) => {
    return await ddbDocClient.send(
        new DeleteCommand({
            TableName: TABLE_NAME,
            Key: {
                Id,
                dateEdited,
            },
        })
    );
};
