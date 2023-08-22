const { SMTPServer } = require('smtp-server');
const { simpleParser } = require('mailparser');
const { Server } = require('ws');
const WebSocket = require('ws');
const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.resolve(__dirname, './static')));

const myServer = app.listen(8001, () => console.log('[express] listening on 8001')); // regular http server using node express which serves your webpage

const wsServer = new Server({ noServer: true });

const config = {
    port: process.env.SMTP_SERVER_PORT || 12345,
};

const data = [];

wsServer.on('connection', function (ws) {
    ws.on('message', function (msg) {
        console.log('S ', msg.toString());
        wsServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                // check if client is ready
                client.send(JSON.stringify(data));
            }
        });
    });
});

myServer.on('upgrade', async function upgrade(request, socket, head) {
    // // accepts half requests and rejects half. Reload browser page in case of rejection
    // if (Math.random() > 0.5) {
    //     return socket.end('HTTP/1.1 401 Unauthorized\r\n', 'ascii'); //proper connection close in case of rejection
    // }

    //emit connection when request accepted
    wsServer.handleUpgrade(request, socket, head, function done(ws) {
        wsServer.emit('connection', ws, request);
    });
});

const server = new SMTPServer({
    logger: false, // log to console
    banner: 'Welcome to My SMTP Server',
    disabledCommands: ['STARTTLS'], // disable STARTTLS to allow authentication in clear text mode
    size: 10 * 1024 * 1024, // Accept messages up to 10 MB. This is a soft limit

    // Setup authentication -- Allow all usernames and passwords, no account checking
    onAuth(auth, session, callback) {
        console.log('Auth ', auth);
        // console.log("AUth ", session);

        return callback(null, {
            user: { username: auth.username },
        });
    },

    // Handle message stream
    onData(stream, session, callback) {
        console.log('Streaming message from user %s', session?.user);
        console.log('------------------');
        // stream.pipe(process.stdout);
        const chunks = [];

        stream.on('readable', () => {
            let chunk;
            while (null !== (chunk = stream.read())) {
                chunks.push(chunk);
            }
        });
        stream.on('end', async () => {
            const content = chunks.join('');
            const mailObj = await simpleParser(content);
            data.push({ session, data: mailObj });
            console.log('Mail Received');
            // console.log('Data ', JSON.stringify(data));
            wsServer.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    // check if client is ready
                    // client.send('Mail Received'.toString());
                    client.send(JSON.stringify({ session, data: mailObj }));
                }
            });
            // console.log('Content ', content);
            console.log(''); // ensure line-break after the message
            callback(null); // accept the message once the stream is ended
            // "Message queued as " + Date.now()
        });
    },
});

server.on('error', (err) => console.log('[error] ', err));

server.listen(config.port, () => console.log(`Listening on ${config.port}`));
