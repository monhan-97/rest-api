/**
 * 用户登录请求体
 */
export type UserLoginRequestBody = {
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password: string;
};

/**
 * 用户登录响应内容
 */
export type UserLoginResponseData = string;
