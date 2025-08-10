import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import HttpExceptionError from './HttpExceptionError';

const secretKey = '$_JWT_SECRET_' + process.env.APP_ENV;

export type JwtPayload = {
  userId: number;
};

/**
 *
 * @returns
 */
export const getJwtToken = (userId: number): string => {
  return jwt.sign(
    { userId: userId },
    secretKey, // 密钥
    { expiresIn: '30d' }, // 过期时间
  );
};

/**
 * 验证token
 * @param token
 * @returns
 */
export const verifyJwtToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(new HttpExceptionError(StatusCodes.UNAUTHORIZED, err.message));
        return;
      }

      if (!decoded) {
        reject(new HttpExceptionError(StatusCodes.INTERNAL_SERVER_ERROR));
        return;
      }

      resolve(decoded as JwtPayload);
    });
  });
};
