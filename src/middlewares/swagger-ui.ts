import { resolve } from 'node:path';

import type Koa from 'koa';
import { koaSwagger } from 'koa2-swagger-ui';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    swagger: '2.0',
    info: {
      description:
        'This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.',
      version: '1.0.0',
      title: 'Api Documentation',
      termsOfService: 'http://swagger.io/terms/',
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
  },
  apis: [resolve(__dirname, '../routes/**/*.ts')],
};

const specs = swaggerJsdoc(options) as Record<string, unknown>;

const swaggerUI: Koa.Middleware = koaSwagger({
  routePrefix: '/api-docs',
  swaggerOptions: {
    spec: specs,
  },
});

export default swaggerUI;
