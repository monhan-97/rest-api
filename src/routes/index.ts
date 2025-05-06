import Router from '@koa/router';

import Koa from 'koa';
import userRouter from './user';

const router = new Router({
  prefix: '/api',
});

router.use('/user', userRouter.routes());

const routes = (app: Koa) => {
  app.use(router.routes());
  app.use(router.allowedMethods());
};

export default routes;
