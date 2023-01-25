const http = require('http');
const url = require('url');
const { connect } = require('amqplib');

const config = {
    port: process.env.PORT || 8000,
    queueUrl: process.env.QUEUE_URL || 'amqp://admin:admin@localhost',
    queue: process.env.QUEUE || 'test',
};

let channel;

const getChannel = async () => {
    if (!channel) {
        const connection = await connect(config.queueUrl);
        channel = await connection.createChannel();
        await channel.assertQueue(config.queue, { durable: true });
        // connection.on('close', ()=> {})
    }
    return channel;
};

const pushMessageToQueue = async (data) => {
    try {
        const channel = await getChannel();

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
};

http.createServer(async (req, res) => {
    console.log(`[req] ${req.method} : ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const reqUrl = url.parse(req.url, true);
    if (reqUrl.pathname === '/send-mail/' && req.method === 'GET') {
        const query = reqUrl.query;
        const to = (query && query.to) || 'test@myserver.com';
        const subject = (query && query.subject) || 'Test Mail';
        const text = (query && query.message) || 'This is a test Mail';
        const result = await pushMessageToQueue({ to, subject, text });
        res.write(result);
    } else {
        res.write('Ok');
    }
    res.end();
}).listen(config.port, () => {
    console.log(`Listening on ${config.port}`);
});
