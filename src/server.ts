import express from 'express';

export const start = (port: number, rootPath: string, rootHandler: any) => {
    const app = express();

    app.use(rootPath, rootHandler);

    app.listen(port, () => console.log(`Listening on ${port}`));
};

class Servers {
    register(port: number, rootPath: string, rootHandler: any) {}

    start() {}
}
