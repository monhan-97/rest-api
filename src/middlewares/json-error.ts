import type Koa from 'koa';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import {
  ApiExceptionError,
  HttpExceptionError,
  ResponseType,
  createResponse,
  logger,
} from '@/utils';

const createJSONError = (ctx: Koa.ParameterizedContext, message?: string) => {
  return {
    timestamp: Date.now(),
    status: ctx.status,
    error: message ?? getReasonPhrase(ctx.status),
    path: ctx.path,
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
      logger.error(err.message);
      ctx.status = err.status;
      ctx.body = createJSONError(ctx, err.message);
    } else if (err instanceof ApiExceptionError) {
      ctx.status = err.status;
      ctx.body = createResponse(null, ResponseType.Fail, err.message);
    } else {
      err.message && logger.error(err.message);
      ctx.status = err.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      ctx.body = createJSONError(ctx);
    }
  }
};

export default jsonError;
