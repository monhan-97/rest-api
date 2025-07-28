import Router from '@koa/router';
import type Koa from 'koa';

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
