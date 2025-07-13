import { Body, Consumes, Controller, Middlewares, Post, Route, Tags } from 'tsoa';

import { responseFormatter, validateBody } from '@/middlewares';
import { userService } from '@/services/UserService';
import { UserLoginReqDTO } from '@/dtos/UserLoginDTO';

@Route('user')
@Tags('User Controller')
export class UserController extends Controller {
  /**
   * @summary 用户登录接口
   */
  @Post('login')
  @Consumes('text/plain')
  @Middlewares(validateBody(UserLoginReqDTO), responseFormatter)
  public userLogin(@Body() requestBody: UserLoginReqDTO) {
    return userService.userLogin(requestBody);
  }
}
