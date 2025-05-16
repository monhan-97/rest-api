import type Koa from 'koa';
import compose from 'koa-compose';
import mount from 'koa-mount';
import serve from 'koa-static';
import { bodyParser } from '@koa/bodyparser';

import { routePrefix } from '@routes/config';

import jsonError from './json-error';
import swaggerUI from './swagger-ui';

const composeMiddleWare = compose([
  jsonError,
  bodyParser(),
  mount(routePrefix, serve('dist/static')),
  swaggerUI,
]);

const middleWares = (app: Koa) => {
  app.use(composeMiddleWare);
};

export default middleWares;
