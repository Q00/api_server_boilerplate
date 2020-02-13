import { IuserDTO } from '../service/UserService';
import { IsBoolean, IsString, IsDate, IsEnum } from 'class-validator';
import { IuserAccountDTO } from '../service/UserAccountService';
import { Provider } from '../model/Enum';

export class IuserDTOClass implements IuserDTO {
  @IsString()
  nickname!: string;
  @IsString()
  name!: string;
  @IsDate()
  birthday!: Date;
  @IsString()
  profile!: string;
  @IsString()
  phone!: string;
  @IsString()
  email!: string;
}

export class IuserAccountDTOClass implements IuserAccountDTO {
  @IsEnum(Provider)
  provider!: Provider;
  @IsString()
  clientId!: string;
}

export class LoginResponse {
  @IsBoolean()
  result!: boolean;
  @IsString()
  jwt!: string;
}
