import { getReasonPhrase } from 'http-status-codes';

class HttpExceptionError extends Error {
  /**
   * 自定义错误内容
   */
  public error: string;
  /**
   * 请求错误时间戳
   */
  public timestamp: number;

  constructor(public status: number) {
    let newMessage = getReasonPhrase(status);
    super(newMessage);
    this.error = newMessage;
    this.timestamp = Date.now();
    this.name = 'HttpExceptionError';
  }
}

export default HttpExceptionError;
