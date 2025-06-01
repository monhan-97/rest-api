import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class HttpExceptionError extends Error {
  /**
   * 自定义错误内容
   */
  public error: string;
  /**
   * 请求错误时间戳
   */
  public timestamp: number;

  public errorMessage: string;

  constructor(
    public status: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message?: string,
  ) {
    let error = getReasonPhrase(status);
    super(error);
    this.error = error;
    this.errorMessage = message || this.error;
    this.timestamp = Date.now();
    this.name = 'HttpExceptionError';
  }
}

export default HttpExceptionError;
