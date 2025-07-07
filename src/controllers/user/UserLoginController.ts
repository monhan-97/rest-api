import { Body, Consumes, Controller, Post, Response, Route, Tags } from 'tsoa';

import { ResponseData } from '@/decorators';

import type { UserLoginRequestBody, UserLoginResponseData } from './types';
import { usersService } from './UsersService';

@Route('user')
@Tags('用户登录')
export class UserLoginController extends Controller {
  /**
   * @summary 用户登录接口
   */
  @Post('login')
  @Response<UserLoginResponseData>(200)
  @ResponseData()
  @Consumes('text/plain')
  public async userLogin(@Body() requestBody: UserLoginRequestBody) {
    return usersService.userLogin(requestBody);
  }
}
