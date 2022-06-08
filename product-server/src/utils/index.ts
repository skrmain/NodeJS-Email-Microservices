import { join } from "path";
import { createConnection } from "typeorm";
import { Connection } from "amqplib";
import { connect } from "amqplib/callback_api";

const RMQ_URL = process.env.RMQ_URL || "amqp://localhost";
const RMQ_QUEUE = process.env.RMQ_QUEUE || "development";
const MYSQL_HOSTNAME = process.env.MYSQL_HOSTNAME || "localhost";
const MYSQL_PORT = parseInt(process.env.MYSQL_PORT || "3306");
const MYSQL_USER = process.env.MYSQL_USER || "root";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "root";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "test";

export const connectMySQL = () => {
    const entityPathTS = join(__dirname, "../entity/*.ts");
    const entityPathJS = join(__dirname, "../entity/*.js");

    return createConnection({
        type: "mysql",
        host: MYSQL_HOSTNAME,
        port: MYSQL_PORT,
        username: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        entities: [entityPathTS, entityPathJS],
        synchronize: false,
        logging: false,
    });
};

export const getRMQConnection = () => {
    return new Promise<Connection>((resolve: any, reject) => {
        connect(RMQ_URL, function (error, connection) {
            if (error) {
                reject(error);
            }
            resolve(connection);
        });
    });
};

export const sendMailMessageInQueue = async (data: any) => {
    try {
        const rmqConnection = await getRMQConnection();
        const channel = await rmqConnection.createChannel();

        await channel.assertQueue(RMQ_QUEUE, {
            durable: true,
        });

        const sent = channel.sendToQueue(
            RMQ_QUEUE,
            Buffer.from(
                JSON.stringify({
                    to: data.sender,
                    subject: "Registration Mail",
                    text: data.message,
                })
            ),
            {
                // Store queued elements on disk
                persistent: true,
                contentType: "application/json",
            }
        );
        console.log("SENT : ", sent);
        return true;
    } catch (error) {
        console.log("Error : ", error);

        return false;
    }
};
