import { config } from "dotenv";
config({ path: "src/.env" });

import { getMailTransport, getRMQConnection } from "./utils";

const RMQ_QUEUE = process.env.RMQ_QUEUE || "development";

(async () => {
    const transport = getMailTransport();
    const rmqConnection = await getRMQConnection();
    const channel = await rmqConnection.createChannel();

    await channel.assertQueue(RMQ_QUEUE, { durable: true });

    channel.prefetch(1);
    console.log("Waiting for messages...");

    channel.consume(RMQ_QUEUE, (data) => {
        if (data === null) return;

        // Decode message contents
        let message = JSON.parse(data.content.toString());

        console.log("Message : ", message);

        // attach message specific authentication options
        // this is needed if you want to send different messages from
        // different user accounts
        message.auth = {
            user: "testuser",
            pass: "testpass",
        };

        // Send the message using the previously set up Nodemailer transport
        transport.sendMail(message, (err, info) => {
            if (err) {
                console.error(err.stack);
                // put the failed message item back to queue
                return channel.nack(data);
            }
            console.log("Delivered message %s", info.messageId);
            // remove message item from the queue
            channel.ack(data);
        });
    });
})();
