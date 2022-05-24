import {
  CreateTableCommand,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

import { ddbClient, ddbDocClient } from "./../database/dynamodb";

// Set the parameters

export const TABLE_NAME = "TEST_TABLE";

export const createDBTable = async () => {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "Season", //ATTRIBUTE_NAME_1
        AttributeType: "N", //ATTRIBUTE_TYPE
      },
      {
        AttributeName: "Episode", //ATTRIBUTE_NAME_2
        AttributeType: "N", //ATTRIBUTE_TYPE
      },
    ],
    KeySchema: [
      {
        AttributeName: "Season", //ATTRIBUTE_NAME_1
        KeyType: "HASH",
      },
      {
        AttributeName: "Episode", //ATTRIBUTE_NAME_2
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: TABLE_NAME, //TABLE_NAME
    StreamSpecification: {
      StreamEnabled: false,
    },
  };
  return await ddbClient.send(new CreateTableCommand(params));
};

export const listDBTables = async () => {
  return await ddbClient.send(new ListTablesCommand({}));
};

export const insertIntoDB = async () => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      Season: 1,
      Episode: 3,
      Data: {
        name: "Iron Man 3",
        year: 2018,
      },
    },
  };
  return ddbDocClient.send(new PutCommand(params));
};

export const getAllItemsFromDB = async () => {
  return await ddbDocClient.send(
    new ScanCommand({
      TableName: TABLE_NAME,
    })
  );
};

export const updateItemInDB = async () => {
  return await ddbDocClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        Season: 1,
        Episode: 1,
        Data: {
          name: "Marvel - Iron Man I",
          year: 2012,
        },
      },
    })
  );
};

export const deleteItemInDB = async () => {
  return await ddbDocClient.send(
    new DeleteCommand({
      TableName: "TEST_TABLE",
      Key: {
        Season: 1,
        Episode: 1,
      },
    })
  );
};
