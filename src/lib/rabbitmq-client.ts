import { connect } from 'amqplib';

const config = {
    port: process.env.PORT || 8000,
    queue: process.env.QUEUE || 'test',
    queueUrl: process.env.QUEUE_URL || 'amqp://admin:admin@localhost',
};

class RabbitMqClient {
    connection;
    senderChannel;
    receiverChannel;

    async getConnection() {
        if (!this.connection) {
            this.connection = await connect(config.queueUrl);
            // TODO: connection.on('close', ()=> {})
        }
        return this.connection;
    }
    // TODO: add connection close, disconnect
    // May be add logic to reconnect to exit and restart the app
    async getChannel(type: 'SENDER' | 'RECEIVER') {
        if (type === 'SENDER') {
            if (!this.senderChannel) {
                const connection = await this.getConnection();
                this.senderChannel = await connection.createChannel();
                await this.senderChannel.assertQueue(config.queue, { durable: true });
                this.senderChannel.prefetch(1);
            }
            return this.senderChannel;
        } else if (type === 'RECEIVER') {
            if (!this.receiverChannel) {
                const connection = await this.getConnection();
                this.receiverChannel = await connection.createChannel();
                await this.receiverChannel.assertQueue(config.queue, { durable: true });
                this.receiverChannel.prefetch(1);
            }

            return this.receiverChannel;
        }
    }

    async pushMessageToQueue(data) {
        try {
            const channel = await this.getChannel('SENDER');

            const sent = channel.sendToQueue(config.queue, Buffer.from(JSON.stringify({ ...data })), {
                persistent: true, // Store queued elements on disk
                contentType: 'application/json',
            });
            console.log('Sent ', sent);
            return 'Message Pushed';
        } catch (error) {
            console.log('Error : ', error);
            return 'Error';
        }
    }

    async addConsumerToQueue(consumer) {
        try {
            const channel = await this.getChannel('RECEIVER');
            channel.consume(config.queue, consumer);
            console.log('Waiting for messages...');
        } catch (error) {
            console.log('[consume-error] ', error);
        }
    }
}

// Usage
const rabbitMqClient = new RabbitMqClient();

rabbitMqClient.addConsumerToQueue(async (data) => {
    // Data received here
    if (data === null) return;
    let message = JSON.parse(data.content.toString());
    console.log('Message : ', message);
});
