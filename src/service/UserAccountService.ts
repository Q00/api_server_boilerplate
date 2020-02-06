import { Service } from 'typedi';
import { UserAccount } from '../model';
import { BaseService } from './BaseService';
import { Provider } from '../model/Enum';
import { InternalServerError } from 'routing-controllers';
export interface IuserAccountDTO {
  provider: Provider;
  clientId: string;
}

@Service()
export class UserAccountService extends BaseService<UserAccount> {
  constructor() {
    super(UserAccount);
  }

  async getOrNewAccount(tempUser: IuserAccountDTO): Promise<UserAccount> {
    const user = await this.genericRepository.findOne({
      where: { provider: tempUser.provider, clientId: tempUser.clientId },
      relations: ['user'],
    });

    if (user) {
      return user;
    }
    return this.genericRepository.save({
      provider: tempUser.provider,
      clientId: tempUser.clientId,
    });
  }

  getByClientId(clientId: string): Promise<UserAccount> {
    return this.genericRepository.findOne({
      relations: ['user'],
      where: { clientId },
    }) as Promise<UserAccount>;
  }

  async update(
    userAccountId: number,
    user: Partial<UserAccount>,
  ): Promise<void> {
    try {
      await this.genericRepository.update(userAccountId, { user });
    } catch (err) {
      throw new InternalServerError(err);
    }
  }
}
