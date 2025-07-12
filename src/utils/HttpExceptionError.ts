import { StatusCodes } from 'http-status-codes';

class HttpExceptionError extends Error {
  constructor(
    public message: string,
    public status: number = StatusCodes.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.name = 'HttpExceptionError';
  }
}

export default HttpExceptionError;
