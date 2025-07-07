import type Koa from 'koa';
import mount from 'koa-mount';
import serve from 'koa-static';
import cors from '@koa/cors';
import { bodyParser } from '@koa/bodyparser';

import { routePrefix } from '@routes/config';

import jsonError from './json-error';
import swaggerUI from './swagger-ui';

const middleWares = (app: Koa) => {
  app
    .use(jsonError)
    .use(
      bodyParser({
        extendTypes: {
          json: ['text/plain', 'application/json'],
        },
        encoding: 'utf-8',
      }),
    )
    .use(cors());
  app.use(mount(routePrefix, serve('dist/static'))).use(swaggerUI);
};

export default middleWares;
