import { Client } from "@elastic/elasticsearch";

import { SampleErrors } from "./data/error.data";

const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "admin@123",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function run() {
  console.log("Starting...");

  for (const error of SampleErrors) {
    await client.index({
      index: `error-${error.service}`,
      document: {
        ...error,
      },
    });
  }

  console.log("Done");
  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  //   await client.indices.refresh({ index: "game-of-thrones" });

  //   // Let's search!
  //   const result = await client.search({
  //     index: "game-of-thrones",
  //     query: {
  //       match: { quote: "winter" },
  //     },
  //   });

  //   console.log(result.hits.hits);
}

run().catch(console.log);
