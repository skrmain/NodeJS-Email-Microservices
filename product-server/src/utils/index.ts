import { join } from "path";
import { createConnection } from "typeorm";
import { Connection } from "amqplib";
import { connect } from "amqplib/callback_api";

const RMQ_URL = process.env.RMQ_URL || "amqp://localhost";
const RMQ_QUEUE = process.env.RMQ_QUEUE || "development";

export const connectMySQL = () => {
    const entityPath = join(__dirname, "../entity/*.ts");

    return createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "admin",
        database: "learning",
        entities: [entityPath],
        synchronize: true,
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
