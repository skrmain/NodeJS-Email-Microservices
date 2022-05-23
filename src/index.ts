import { DynamoDB } from "@aws-sdk/client-dynamodb";

(async () => {
    const client = new DynamoDB({ region: "ap-south-1", endpoint: "http://localhost:8000" });
    try {
        const results = await client.listTables({});

        console.log(results.TableNames);
    } catch (err) {
        console.error(err);
    }
})();