export const TABLE_NAME = "Products";

// DynamoDB Product Schema
export const ProductSchemaDDB = {
  AttributeDefinitions: [
    {
      AttributeName: "Id", // Partition Key
      AttributeType: "S", // String
    },
    {
      AttributeName: "dateEdited", // Sort Key
      AttributeType: "S", // String
    },
  ],
  KeySchema: [
    {
      AttributeName: "Id",
      KeyType: "HASH", // Partition Key
    },
    {
      AttributeName: "dateEdited",
      KeyType: "RANGE", // Sort Key
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
