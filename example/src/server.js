const http = require('http');
const url = require('url');
const { createTransport } = require('nodemailer');

const config = {
    port: process.env.PORT || 8000,
    smtpHost: process.env.SMTP_SERVER_HOSTNAME || '127.0.0.1',
    smtpPort: parseInt(process.env.SMTP_SERVER_PORT || '12345'),
};

let transport;

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

http.createServer(async (req, res) => {
    console.log(`[req] ${req.method} : ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const reqUrl = url.parse(req.url, true);
    if (reqUrl.pathname === '/send-mail/' && req.method === 'GET') {
        const query = reqUrl.query;
        const to = (query && query.to) || 'test@myserver.com';
        const subject = (query && query.subject) || 'Test Mail';
        const text = (query && query.message) || 'This is a test Mail';
        const html = `
        <style>
            .mail-content {
                text-align: center;
                margin: 0;
                font-family: sans-serif;
            }
            a {
                background-color: red;
                padding: 1rem;
            }
        </style>
        <div class="mail-content">
            <h1>Hi, Ram</h1>
            <p>Click on below link to verify your account for StoreApp</p>
            <a href="https://google.com" target="_blank">Verify Account</a>
        </div>`;
        const message = { to, subject, text, html };
        message.auth = { user: 'user-1', pass: 'pass' };
        const result = await sendMail(message);
        res.write(result);
    } else {
        res.write('Ok');
    }
    res.end();
}).listen(config.port, () => {
    console.log(`Listening on ${config.port}`);
});
