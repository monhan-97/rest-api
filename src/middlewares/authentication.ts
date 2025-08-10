import type Koa from 'koa';
import { isNil } from 'lodash-es';
import { StatusCodes } from 'http-status-codes';

import { HttpExceptionError } from '@/utils';
import { verifyJwtToken } from '@/utils/jwt';
function extractToken(req: Koa.Request) {
  const authHeader = req.headers.authorization;
  return authHeader?.split(' ')[1];
}

export const koaAuthentication = async (request: Koa.Request, securityName: string) => {
  if (securityName !== 'jwt') {
    throw new HttpExceptionError(StatusCodes.INTERNAL_SERVER_ERROR, 'Unknown security scheme');
  }

  const token = extractToken(request);

  if (isNil(token)) {
    throw new HttpExceptionError(StatusCodes.UNAUTHORIZED);
  }

  const verifyRes = await verifyJwtToken(token);

  return verifyRes;
};
