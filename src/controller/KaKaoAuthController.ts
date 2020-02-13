import {
  JsonController,
  Get,
  QueryParam,
  Post,
  Body,
} from 'routing-controllers';
import { KaKaoProvider } from '../provider/KakaoProvider';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { BaseAuthController } from './BaseAuthController';
import { IuserDTOClass, LoginResponse } from '../dto/UserDTO';

// just make other provider class and naming class then you can use another OAuth
@JsonController('/kakao')
export class KaKaoAuthController extends BaseAuthController<KaKaoProvider> {
  constructor(kakaoProvider: KaKaoProvider) {
    super(kakaoProvider);
  }

  @Get('/login')
  @OpenAPI({
    summary: 'login with access_token',
    description:
      "return { result: true, jwt: jwt } or { result: false, jwt: '' } ",
  })
  @ResponseSchema(LoginResponse)
  async kakaoLogin(@QueryParam('access_token') accessToken: string) {
    const clientId = await this.provider.getClient_id(accessToken);
    return this.login(clientId);
  }

  @Post('/register')
  @OpenAPI({
    summary: 'register with access_token',
    description: 'kakao register',
  })
  @ResponseSchema(LoginResponse, {
    description: 'register',
    isArray: false,
    statusCode: '201',
  })
  async kakaoRegister(
    @Body()
    body: IuserDTOClass,
    @QueryParam('access_token') accessToken: string,
  ) {
    const clientId = await this.provider.getClient_id(accessToken);
    return this.register(body, clientId);
  }
}
