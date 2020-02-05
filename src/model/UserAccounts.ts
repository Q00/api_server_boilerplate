import { Column, Entity, OneToOne, Unique, JoinColumn } from 'typeorm';
import { IsEnum, IsString, IsObject } from 'class-validator';
import { User } from './Users';
import { BaseModel } from './BaseModel';
import { Provider } from './Enum';

@Entity()
@Unique(['clientId', 'user'])
export class UserAccount extends BaseModel {
  @IsEnum(Provider)
  @Column({ type: 'enum', enum: Provider })
  public provider!: Provider;

  @IsString()
  @Column({ length: 50 })
  public clientId!: string;

  @IsObject()
  @OneToOne(
    // eslint-disable-next-line no-unused-vars
    (_) => User,
    (user) => user.userAccount,
    { nullable: true },
  )
  @JoinColumn()
  public user?: User;
}
