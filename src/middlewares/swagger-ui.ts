import path from 'node:path';

import type Koa from 'koa';
import { koaSwagger } from 'koa2-swagger-ui';

import { routePrefix } from '@/routes/config';

const swaggerUI: Koa.Middleware = koaSwagger({
  routePrefix: '/api-docs',
  swaggerOptions: {
    url: path.join(routePrefix, 'swagger.json'),
    deepLinking: true,
  },
  customCSS: '.download-url-wrapper { display: none !important;}',
});

export default swaggerUI;
