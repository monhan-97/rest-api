import { StatusCodes, getReasonPhrase } from 'http-status-codes';

const messageMap = {
  404: 'No message available',
};

class HttpExceptionError extends Error {
  /**
   * 自定义错误内容
   */
  public error: string;
  /**
   * 错误消息
   */
  public message: string;
  /**
   * 请求错误时间戳
   */
  public timestamp: number;

  constructor(
    public status: number,
    message?: string,
  ) {
    let newMessage =
      message ||
      messageMap[status as keyof typeof messageMap] ||
      getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

    super(newMessage);
    this.error = getReasonPhrase(this.status);
    this.timestamp = Date.now();
    this.name = 'HttpExceptionError';
  }
}

export default HttpExceptionError;
