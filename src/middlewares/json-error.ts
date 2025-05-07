import Koa from 'koa';
import { isNil } from 'lodash-es';

import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import HttpException from 'src/utils/HttpException';

export type HttpExceptionTypes = {
  timestamp?: number;
  status: number;
  error: string;
  message: string;
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
    message: options.message,
  };
};

const jsonError: Koa.Middleware = async (ctx, next) => {
  try {
    await next();
    if (shouldThrow404(ctx.status, ctx.body)) {
      throw new HttpException(StatusCodes.NOT_FOUND);
    }
  } catch (err: any) {
    if (err instanceof HttpException) {
      ctx.status = err.status;
      ctx.body = formatError(ctx, {
        timestamp: err.timestamp,
        error: err.error,
        message: err.message,
        status: ctx.status,
      });
    } else {
      ctx.status = err.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
      ctx.body = formatError(ctx, {
        error: getReasonPhrase(ctx.status),
        message: err.message,
        status: ctx.status,
      });
    }
  }
};

export default jsonError;
