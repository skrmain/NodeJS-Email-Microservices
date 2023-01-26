const { connect } = require('amqplib');
const { createTransport } = require('nodemailer');

const config = {
    queue: process.env.QUEUE || 'test',
    queueUrl: process.env.QUEUE_URL || 'amqp://admin:admin@localhost',
    smtpHost: process.env.SMTP_SERVER_HOSTNAME || '127.0.0.1',
    smtpPort: parseInt(process.env.SMTP_SERVER_PORT || '12345'),
};

let channel;
let transport;

const getChannel = async () => {
    if (!channel) {
        const connection = await connect(config.queueUrl);
        channel = await connection.createChannel();
        await channel.assertQueue(config.queue, { durable: true });
        channel.prefetch(1);
        // connection.on('close', ()=> {})
    }
    return channel;
};

const addConsumerToQueue = async (consumer) => {
    try {
        const channel = await getChannel();
        channel.consume(config.queue, consumer);
        console.log('Waiting for messages...');
    } catch (error) {
        console.log('[consume-error] ', error);
    }
};

const sendMail = (message) => {
    if (!transport) {
        transport = createTransport(
            {
                host: config.smtpHost,
                port: config.smtpPort,
                disableFileAccess: true, // Security options to disallow using attachments from file or URL
                disableUrlAccess: true,
            },
            {
                from: 'sender@example.com', // Default options for the message. Used if specific values are not set
            }
        );
        // transport.on('error', ()=> {})
    }
    return transport.sendMail(message);
};

addConsumerToQueue(async (data) => {
    if (data === null) return;
    let message = JSON.parse(data.content.toString());
    console.log('Message : ', message);
    message.auth = { user: 'user-1', pass: 'pass' };

    try {
        const result = await sendMail(message);
        console.log('Delivered message %s', result.messageId);
        channel.ack(data); // remove message item from the queue
        // process.exit(0);
    } catch (error) {
        console.log('[mail-error]', error);
        channel.nack(data); // put the failed message item back to queue
        process.exit(1);
    }
});
