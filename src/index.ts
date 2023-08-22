// import { graphqlHandler } from './examples/express-graphql-handler';
// import { start } from './server';

(async () => {
    try {
        console.log('Hello World');

        // start(8080, '/app1', (req: any, res: any) => res.send('Received'));
        // start(8081, '/graphql', graphqlHandler);
    } catch (error) {
        console.error('[error]', error);
    }
})();
