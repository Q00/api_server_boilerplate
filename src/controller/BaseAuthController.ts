import { BaseController } from './BaseController';
import { UserAccountService, UserService } from '../service';
import { Provider } from '../model/Enum';
import { BaseProvider } from '../provider/BaseProvider';
import Container from 'typedi';
import { IuserDTOClass } from '../dto/UserDTO';

export class BaseAuthController<T extends BaseProvider> extends BaseController {
  // this can be used in child class (ExampleAuthController)
  protected userAccountService: UserAccountService;
  protected userService: UserService;
  constructor(protected provider: T) {
    super();
    this.provider = provider;
    this.userAccountService = Container.get(UserAccountService);
    this.userService = Container.get(UserService);
  }

  async login(clientId: string) {
    const userAccount = await this.userAccountService.getOrNewAccount({
      provider: Provider['KAKAO'],
      clientId,
    });
    if (userAccount.user == null) return { result: false, jwt: '' };
    else {
      const jwt = await this.provider.generateToken(userAccount.user.id);
      return { result: true, jwt };
    }
  }

  async register(userDTO: IuserDTOClass, clientId: string) {
    const user = await this.userService.createOrUpdate(
      {
        nickname: userDTO.nickname,
        name: userDTO.name,
        birthday: userDTO.birthday,
        profile: userDTO.profile,
        phone: userDTO.phone,
        email: userDTO.email,
      },
      clientId,
    );
    const jwt = await this.provider.generateToken(user.id);
    return { result: true, jwt, user };
  }
}
