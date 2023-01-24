import { createTransport } from "nodemailer";
import { Connection } from "amqplib";
import { connect } from "amqplib/callback_api";

const SMTP_PORT = parseInt(process.env.SMTP_PORT || "12345");
const SMTP_HOSTNAME = process.env.SMTP_HOSTNAME || "127.0.0.1";
const RMQ_URL = process.env.RMQ_URL || "amqp://localhost";

const transport = createTransport(
    {
        host: SMTP_HOSTNAME,
        port: SMTP_PORT,
        // Security options to disallow using attachments from file or URL
        disableFileAccess: true,
        disableUrlAccess: true,
    },
    {
        // Default options for the message. Used if specific values are not set
        from: "sender@example.com",
    }
);

// export const getMailTransport = () => transport;

/**
 * Send the message using Nodemailer transport
 * @param message -
 * @returns
 */
export const sendMail = (message: any) => {
    try {
        return transport.sendMail(message);
    } catch (error) {
        console.log("[sendMail][Error]", error);
    }
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
