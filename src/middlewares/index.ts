import Koa from 'koa';
import compose from 'koa-compose';
import jsonError from './json-error';

const composeMiddleWare = compose([jsonError]);

const middleWares = (app: Koa) => {
  app.use(composeMiddleWare);
};

export default middleWares;
