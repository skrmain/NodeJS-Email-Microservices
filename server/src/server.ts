import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { sendMailMessageInQueue } from "./shared/utils";

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} : ${req.path}`);
    next();
});

app.get("/", (req, res) => res.send("OK"));

app.get(
    "/send-mail",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await sendMailMessageInQueue({
                message: `This is a test mail from Admin`,
                sender: "test@myserver.com",
            });

            return res.send({ message: "success" });
        } catch (error: any) {
            return next(error);
        }
    }
);

// TODO: Implement Error Handler

export default app;
