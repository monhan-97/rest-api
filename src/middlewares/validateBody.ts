import type { ClassConstructor } from 'class-transformer';
import { plainToInstance } from 'class-transformer';
import type { ValidatorOptions } from 'class-validator';
import { validateSync } from 'class-validator';
import type { Context, Next } from 'koa';
import { StatusCodes } from 'http-status-codes';

import { HttpExceptionError } from '@/utils';

const validateBody = <T extends object>(
  targetClass: ClassConstructor<T>,
  validatorOptions?: ValidatorOptions,
) => {
  return async (ctx: Context, next: Next) => {
    const instance = plainToInstance(targetClass, ctx.request.body);

    const errors = validateSync(instance, {
      forbidUnknownValues: true,
      validationError: {
        target: false,
      },
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      ...validatorOptions,
    });

    if (errors.length > 0) {
      for (const error of errors) {
        if (error.constraints) {
          throw new HttpExceptionError(
            StatusCodes.UNPROCESSABLE_ENTITY,
            Object.values(error.constraints).join(', '),
          );
        }

        if (error.children && error.children.length > 0) {
          for (const errorNested of error.children) {
            if (errorNested.constraints) {
              throw new HttpExceptionError(
                StatusCodes.UNPROCESSABLE_ENTITY,
                Object.values(errorNested.constraints).join(', '),
              );
            }
          }
        }
      }
    }

    await next();
  };
};

export default validateBody;
