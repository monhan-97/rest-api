import type Koa from 'koa';
import { isNil } from 'lodash-es';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import HttpExceptionError from '@utils/HttpExceptionError';

export type HttpExceptionTypes = {
  timestamp?: number;
  status: number;
  error: string;
  path?: string;
};

const shouldThrow404 = (status: number, body: any) => {
  return isNil(status) || (status === StatusCodes.NOT_FOUND && isNil(body));
};

const formatError = (ctx: Koa.ParameterizedContext, options: HttpExceptionTypes) => {
  return {
    timestamp: options.timestamp || Date.now(),
    status: options.status,
    error: options.error,
    path: options.path || ctx.path,
  };
};

const jsonError: Koa.Middleware = async (ctx, next) => {
  try {
    await next();
    if (shouldThrow404(ctx.status, ctx.body)) {
      throw new HttpExceptionError(StatusCodes.NOT_FOUND);
    } else if (ctx.status === StatusCodes.METHOD_NOT_ALLOWED) {
      throw new HttpExceptionError(StatusCodes.METHOD_NOT_ALLOWED);
    }
  } catch (err: any) {
    if (err instanceof HttpExceptionError) {
      ctx.status = err.status;
      ctx.body = formatError(ctx, {
        timestamp: err.timestamp,
        error: err.error,
        status: ctx.status,
      });
    } else {
      ctx.status = err.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      ctx.body = formatError(ctx, {
        error: getReasonPhrase(ctx.status),
        status: ctx.status,
      });
    }
  }
};

export default jsonError;
