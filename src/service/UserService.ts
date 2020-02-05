import { Service, Container } from 'typedi';
import { User } from '../model';
import { BaseService } from './BaseService';
import { UserAccountService } from './UserAccountService';

export interface IUserDTO {
  nickname: string;
  name: string;
  birthday: Date;
  profile: string;
  phone: string;
  email: string;
  deletedAt?: Date;
}

@Service()
export class UserService extends BaseService<User> {
  constructor(private userAccountService: UserAccountService) {
    super(User);
    this.userAccountService = Container.get(UserAccountService);
  }

  public async getById(userId: number): Promise<User> {
    const relations = ['exampleBoards', 'userAccount'];
    return await super.getById(userId, relations);
  }

  public async createOrUpdate(
    user: Partial<IUserDTO>,
    clientId: string,
  ): Promise<User> {
    const payload: Partial<User> = {};
    if (user.nickname) {
      payload.nickname = user.nickname;
    }
    if (user.name) {
      payload.name = user.name;
    }
    if (user.birthday) {
      payload.birthday = user.birthday;
    }
    if (user.profile) {
      payload.profile = user.profile;
    }
    if (user.phone) {
      payload.phone = user.phone;
    }
    if (user.email) {
      payload.email = user.email;
    }
    const tempAccount = await this.userAccountService.getByClientId(clientId);
    if (tempAccount.user) {
      return await this.genericRepository.save({
        ...tempAccount.user,
        ...payload,
      });
    } else {
      const newUser = await this.genericRepository.save(payload);
      await this.userAccountService.update(tempAccount.id, newUser);
      return newUser;
    }
  }
}
