import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class HttpExceptionError extends Error {
  constructor(
    public status: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message?: string,
  ) {
    super(message ?? getReasonPhrase(status));
    this.name = 'HttpExceptionError';
  }
}

export default HttpExceptionError;
