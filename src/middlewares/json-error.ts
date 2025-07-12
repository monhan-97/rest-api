import type Koa from 'koa';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { ApiExceptionError, HttpExceptionError, ResponseType, createResponse } from '@/utils';

const createJSONError = (ctx: Koa.ParameterizedContext, message?: string) => {
  return {
    timestamp: Date.now(),
    status: ctx.status,
    error: getReasonPhrase(ctx.status),
    path: ctx.path,
    message: message,
  };
};

const jsonError: Koa.Middleware = async (ctx, next) => {
  try {
    await next();
    let status = ctx.status;
    if (status >= 400 && status < 600) {
      ctx.status = status;
      ctx.body = createJSONError(ctx);
    }
  } catch (err: any) {
    if (err instanceof HttpExceptionError) {
      ctx.status = err.status;
      ctx.body = createJSONError(ctx, err.message);
    } else if (err instanceof ApiExceptionError) {
      ctx.body = createResponse(err.message, ResponseType.Fail);
      ctx.status = err.status;
    } else {
      ctx.status = err.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      ctx.body = createJSONError(ctx, err.message ?? '未知错误');
    }
  }
};

export default jsonError;
