import express from 'express';

import config from '@app/config/app';
import routes from '@app/routes';
import { errorHandler, notFound } from '@app/middlewares';

const app = express();
config(app);
app.use('/api', routes);
app.use(notFound());
app.use(errorHandler());

export default app;
