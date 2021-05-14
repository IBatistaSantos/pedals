import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import 'dotenv/config';
import '../../../modules/account/provider';
import '../../container';
import { schema } from '../../schema';
import { IContext } from './middleware/ensureAuthenticated';

const app = async () => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context: IContext = {
        req,
        token: req?.headers?.authorization,
      };
      return context;
    },
  });

  const app = express();
  server.applyMiddleware({ app });
  app.listen(8082, () => {
    console.log('Server running on port 8082');
  });
};

app().catch((e) => {
  console.log('Error:', e);
});
