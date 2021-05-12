import {ApolloServer} from "apollo-server-express"
import express from "express";
import "reflect-metadata"
import "dotenv/config"
import { buildSchema } from "type-graphql"
import { UserResolver } from "./modules/account/resolvers/UserResolver";

const app = async () => {
  const schema = await buildSchema ({
    resolvers: [UserResolver],
    emitSchemaFile: true,
    validate: false
  });

  const server = new ApolloServer({schema});
  const app = express();

  server.applyMiddleware({app});
  app.listen(8082, () => {
    console.log("Server running on port 8082")
  });
}

app().catch((e) => {
  console.log("Error:", e)
});

