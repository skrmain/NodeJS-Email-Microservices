import { config } from "dotenv";
config({ path: "src/.env" });

import { getRMQConnection, sendMail } from "./utils";

const RMQ_QUEUE = process.env.RMQ_QUEUE || "development";

(async () => {
    const rmqConnection = await getRMQConnection();
    const channel = await rmqConnection.createChannel();

    await channel.assertQueue(RMQ_QUEUE, { durable: true });

    channel.prefetch(1);
    console.log("Waiting for messages...");

    channel.consume(RMQ_QUEUE, async (data) => {
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

        const result = await sendMail(message);
        if (result) {
            console.log("Delivered message %s", result.messageId);
            channel.ack(data); // remove message item from the queue
        } else {
            channel.nack(data); // put the failed message item back to queue
        }
    });
})();
