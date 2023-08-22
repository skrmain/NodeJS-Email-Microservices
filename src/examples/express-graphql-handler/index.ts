import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

// // Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// // The root provides a resolver function for each API endpoint
// const root = {
//     hello: () => 'Hello world2!',
// };

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random: () => {
        return Math.random();
    },
    rollThreeDice: () => {
        return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6));
    },
};

export const graphqlHandler = graphqlHTTP({ schema: schema, rootValue: root, graphiql: true });

// const app = express();
// app.use('/graphql', graphqlHandler);

// app.listen(4000, () => console.log('Running a GraphQL API server at http://localhost:4000/graphql'));
