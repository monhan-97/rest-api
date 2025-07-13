import type Koa from 'koa';

import { createResponse } from '@/utils';

const responseFormatter: Koa.Middleware = async (ctx, next) => {
  await next();
  try {
    ctx.body = createResponse(ctx.body);
  } catch (error) {
    throw error;
  }
};

export default responseFormatter;
