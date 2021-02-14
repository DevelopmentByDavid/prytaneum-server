import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import config from '@app/config/app';
import routes from '@app/routes';
import { errorHandler, notFound } from '@app/middlewares';
import apolloConfig from '@app/config/apollo';

// instantiate express server
const app = express();

// instantiate graphql apollo server
export const apollo = new ApolloServer(apolloConfig);

// configure custom middlewares
config(app);

// add graphql as a middleware
apollo.applyMiddleware({ app, path: '/graphql' });

// mount routes
app.use('/api', routes);

// 404 and error handlers
app.use(notFound());
app.use(errorHandler());

export default app;
