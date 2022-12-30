import winston from "winston";
import {
  ElasticsearchTransport,
  ElasticsearchTransportOptions,
} from "winston-elasticsearch";

import { Client } from "@elastic/elasticsearch";

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

const esTransportOpts: ElasticsearchTransportOptions = {
  level: "info",
  client: client,
};

const esTransport = new ElasticsearchTransport(esTransportOpts); //everything info and above goes to elastic

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: "service-error.log",
      level: "error",
    }), //save errors on file
    esTransport,
  ],
});

// Compulsory error handling
logger.on("error", (error) => {
  console.error("Error in logger caught", error);
});
esTransport.on("error", (error) => {
  console.error("Error in logger caught", error);
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      //we also log to console if we're not in production
      format: winston.format.simple(),
    })
  );
}

logger.info("Test!");
logger.error("This is an error message!");
logger.error("This is an error message with an object!", {
  error: true,
  message: "There was a problem!",
});

// Search URL
// https://127.0.0.1:9200/logs-2022.05.24/_search
