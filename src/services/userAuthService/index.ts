import type { UserLoginRequestBody, UserLoginResponseData } from './types';

class UserAuthService {
  public userLogin(requestBody: UserLoginRequestBody): UserLoginResponseData {
    return '123123';
  }
}

export const userAuthService = new UserAuthService();
