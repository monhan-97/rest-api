import { Body, Consumes, Controller, Middlewares, Post, Route, Tags } from 'tsoa';

import { responseFormatter, validateBody } from '@/middlewares';

import { UserLoginDTO } from './dtos/UserLoginDTO';
import { usersService } from './UsersService';

@Route('user')
@Tags('用户登录')
export class UserLoginController extends Controller {
  /**
   * @summary 用户登录接口
   */
  @Post('login')
  @Consumes('text/plain')
  @Middlewares(validateBody(UserLoginDTO), responseFormatter)
  public async userLogin(@Body() requestBody: UserLoginDTO) {
    return usersService.userLogin(requestBody);
  }
}
