import { Body, Controller, Post, Response, Route, Tags } from 'tsoa';

import { userAuthService } from '@/services/userAuthService';
import { ResponseData } from '@/decorators';

import type { UserLoginRequestBody, UserLoginResponseData } from './types';

@Route('user')
@Tags('用户登录')
export class UserLoginController extends Controller {
  /**
   * @summary 用户登录接口
   */
  @Post('login')
  @Response<UserLoginResponseData>(200)
  @ResponseData()
  public async userLogin(@Body() requestBody: UserLoginRequestBody) {
    return userAuthService.userLogin(requestBody);
  }
}
