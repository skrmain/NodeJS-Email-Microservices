import {
  createDBTable,
  deleteItemInDB,
  getAllItemsFromDB,
  insertIntoDB,
  listDBTables,
  updateItemInDB,
} from "./utils/dynamodb.util";

export const run = async () => {
  try {
    // const result = await createDBTable();
    // console.log("Table Created", result.TableDescription?.TableName);

    // const dbTables = await listDBTables();
    // console.log("DB Tables ", dbTables.TableNames);

    // const savedItem = await insertIntoDB();
    // console.log("Saved Item", savedItem);

    const item = await getAllItemsFromDB();
    console.log("Item ", item.Items);

    // const updatedItem = await updateItemInDB();
    // console.log("Updated Item ", updatedItem);

    // const deletedItem = await deleteItemInDB();
    // console.log("Deleted Item ", deletedItem);
  } catch (err) {
    console.log("Error", err);
  }
};
run();
