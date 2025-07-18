import Router from '@koa/router';
import type Koa from 'koa';

// @ts-ignore
import { routePrefix } from '@/routes/config';

import { RegisterRoutes } from './_routes_tsoa';

const router = new Router({
  prefix: routePrefix,
});

RegisterRoutes(router);

const routes = (app: Koa) => {
  app.use(router.routes());
  app.use(router.allowedMethods());
};

export default routes;
