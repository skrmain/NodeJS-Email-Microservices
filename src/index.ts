import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "./database/dynamodb";
import {
  createTable,
  deleteItem,
  getAllItems,
  listTables,
  updateOrAddItem,
} from "./utils/dynamodb.util";
import { Products } from "./data/product.data";
import { TABLE_NAME } from "./schema/product.schema";

export const run = async () => {
  try {
    // const result = await createTable();
    // console.log("Table Created", result.TableDescription?.TableName);

    const dbTables = await listTables();
    console.log("DB Tables ", dbTables.TableNames);

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
    console.log("Error", err);
  }
};
run();
