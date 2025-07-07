import type { UserLoginRequestBody, UserLoginResponseData } from './types';

class UsersService {
  public userLogin(requestBody: UserLoginRequestBody): UserLoginResponseData {
    return '123123';
  }
}

export const usersService = new UsersService();
