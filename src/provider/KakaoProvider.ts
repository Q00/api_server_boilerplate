import { BaseProvider } from './BaseProvider';
import { Authentication } from '../utils/Authenticate';
import { Service } from 'typedi';

@Service()
export class KaKaoProvider extends BaseProvider {
  constructor() {
    super();
  }

  async getClient_id(accessToken: string) {
    this.setInstance('https://kapi.kakao.com', {
      Authorization: `Bearer ${accessToken}`,
    });
    const response = await this.getInstance()?.get(
      '/v1/user/access_token_info',
    );

    return response?.data.id;
  }

  async generateToken(userId: number) {
    return `Bearer ${Authentication.generateToken(userId)}`;
  }
}
