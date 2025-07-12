import { StatusCodes } from 'http-status-codes';

export enum ResponseType {
  Success = 'Success',
  Fail = 'Fail',
}

export type ResponseDataType<T> = {
  code: number;
  data: T;
  message: string;
};

export const createResponse = <T>(
  data: T,
  type: ResponseType = ResponseType.Success,
  message = 'success',
) => {
  return {
    code: type === ResponseType.Success ? 0 : -1,
    data: data,
    message: message,
  };
};

export class ApiExceptionError extends Error {
  constructor(
    public message: string,
    public status: StatusCodes = StatusCodes.OK,
  ) {
    super(message);
    this.name = 'ApiExceptionError';
  }
}
