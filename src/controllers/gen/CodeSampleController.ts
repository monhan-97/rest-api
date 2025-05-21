import { Controller, Get, Response, Route, Tags } from 'tsoa';

import swaggerJSON from 'dist/static/swagger.json';

import { getTypesDefinitions } from './swaggerToTs';
import type { ApiSchemas } from './swaggerToTs/types';

@Route('gen')
@Tags('生成代码')
export class CodeSampleController extends Controller {
  /**
   * @summary 生成代码示例
   * @param tag 接口标签(用户登录)
   */
  @Get('code-sample')
  @Response<string>(200)
  public async codeSample() {
    return getTypesDefinitions(swaggerJSON.components.schemas as unknown as ApiSchemas);
  }
}
