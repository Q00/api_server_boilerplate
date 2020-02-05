import { Service } from 'typedi';
import { UserAccount } from '../model';
import { BaseService } from './BaseService';
import { Provider } from '../model/Enum';
import { InternalServerError } from 'routing-controllers';
export interface IUserAccountDTO {
  provider: Provider;
  clientId: string;
}

@Service()
export class UserAccountService extends BaseService<UserAccount> {
  constructor() {
    super(UserAccount);
  }

  public async getOrNewAccount(
    tempUser: IUserAccountDTO,
  ): Promise<UserAccount> {
    const user = await this.genericRepository.findOne({
      where: { provider: tempUser.provider, clientId: tempUser.clientId },
      relations: ['user'],
    });

    if (user) {
      return user;
    }
    return await this.genericRepository.save({
      provider: tempUser.provider,
      clientId: tempUser.clientId,
    });
  }

  public getByClientId(clientId: string): Promise<UserAccount> {
    return this.genericRepository.findOne({
      relations: ['user'],
      where: { clientId: clientId },
    }) as Promise<UserAccount>;
  }

  public async update(
    userAccountId: number,
    user: Partial<UserAccount>,
  ): Promise<void> {
    try {
      await this.genericRepository.update(userAccountId, { user: user });
    } catch (err) {
      throw new InternalServerError(err);
    }
  }
}
