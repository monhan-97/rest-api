import type { UserLoginReqDTO } from '@/dtos/UserLoginDTO';

class UserService {
  public userLogin(requestBody: UserLoginReqDTO) {
    return '123123';
  }
}

export const userService = new UserService();
