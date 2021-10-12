const express = require("express");
const graphql = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = graphql;
const serverless = require("serverless-http");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
const schema = require("./schema/schema");


const app = express();
module.exports.handler = serverless(app);

// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "HelloWorld",
//     fields: () => ({
//       message: {
//         type: GraphQLString,
//         resolve: () => "Hello World",
//       },
//     }),
//   }),
// });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  "/",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
