import amqplib from "amqplib/callback_api";
import config from "./../config.json";
import { join } from "path";
import { createConnection } from "typeorm";

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

export const sendMailMessageInQueue = async (data: any) => {
    // Create connection to AMQP server
    amqplib.connect(config.amqp, (err, connection) => {
        if (err) {
            console.error(err.stack);
            return process.exit(1);
        }

        // Create channel
        connection.createChannel((err, channel) => {
            if (err) {
                console.error(err.stack);
                return process.exit(1);
            }

            // Ensure queue for messages
            channel.assertQueue(
                config.queue,
                {
                    // Ensure that the queue is not deleted when server restarts
                    durable: true,
                },
                (err) => {
                    if (err) {
                        console.error(err.stack);
                        return process.exit(1);
                    }

                    // Create a function to send objects to the queue
                    // Javascript object is converted to JSON and then into a Buffer
                    let sender = (content: any, next: any) => {
                        let sent = channel.sendToQueue(
                            config.queue,
                            Buffer.from(JSON.stringify(content)),
                            {
                                // Store queued elements on disk
                                persistent: true,
                                contentType: "application/json",
                            }
                        );
                        if (sent) {
                            return next();
                        } else {
                            channel.once("drain", () => next());
                        }
                    };

                    // push 100 messages to queue
                    let sent = 0;
                    let sendNext = () => {
                        if (sent >= 1) {
                            console.log("All messages sent!");
                            // Close connection to AMQP server
                            // We need to call channel.close first, otherwise pending
                            // messages are not written to the queue
                            return channel.close(() => connection.close());
                        }
                        sent++;
                        sender(
                            {
                                to: "recipient@example.com",
                                subject: "Test message #" + sent,
                                text: data.message,
                            },
                            sendNext
                        );
                    };

                    sendNext();
                }
            );
        });
    });
};
