import { Body, Controller, Post, Route, Tags } from 'tsoa';

import { response } from '@utils/response';

import type { UserLoginRequestBody } from './types';

@Route('user')
@Tags('用户登陆')
export class UserLoginController extends Controller {
  /**
   * @summary 用户登陆接口
   */
  @Post('login')
  public async userLogin(@Body() requestBody: UserLoginRequestBody) {
    return response([]);
  }
}
