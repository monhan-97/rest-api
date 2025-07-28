import { isNil } from 'lodash-es';

import type { UserLoginReqDTO } from '@/dtos/UserLoginDTO';
import { ApiExceptionError, prisma } from '@/utils';

class UserService {
  /**
   * 用户登陆
   * @param requestBody
   * @returns
   */
  public async userLogin(requestBody: UserLoginReqDTO) {
    const { password, username } = requestBody;

    const userResult = await prisma.user.findUnique({
      where: { username: username },
      select: {
        id: true,
        password: true,
      },
    });

    if (isNil(userResult) || userResult.password !== password) {
      throw new ApiExceptionError('用户名或密码错误');
    }

    return userResult.id;
  }
}

export const userService = new UserService();
