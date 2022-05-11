import { SMTPServer } from "smtp-server";

const PORT = process.env.PORT || 12345;
// const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

// Setup server
const server = new SMTPServer({
    // log to console
    logger: false,

    // not required but nice-to-have
    banner: "Welcome to My Awesome SMTP Server",

    // disable STARTTLS to allow authentication in clear text mode
    disabledCommands: ["STARTTLS"],

    // Accept messages up to 10 MB. This is a soft limit
    size: 10 * 1024 * 1024,

    // Setup authentication
    // Allow all usernames and passwords, no account checking
    onAuth(auth, session, callback) {
        console.log("AUth ", auth.username);
        console.log("AUth ", auth.password);
        // console.log("AUth ", session);

        return callback(null, {
            user: {
                username: auth.username,
            },
        });
    },

    // Handle message stream
    onData(stream, session, callback) {
        console.log("Streaming message from user %s", session?.user);
        console.log("------------------");
        stream.pipe(process.stdout);
        stream.on("end", () => {
            console.log(""); // ensure line-break after the message
            callback(null); // accept the message once the stream is ended
            // "Message queued as " + Date.now()
        });
    },
});

server.on("error", (err) => {
    console.log("Error occurred");
    console.log(err);
});

// start listening
server.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});
