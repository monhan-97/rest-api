import type Koa from 'koa';
import compose from 'koa-compose';

import jsonError from './json-error';
import swaggerUI from './swagger-ui';

const composeMiddleWare = compose([jsonError, swaggerUI]);

const middleWares = (app: Koa) => {
  app.use(composeMiddleWare);
};

export default middleWares;
