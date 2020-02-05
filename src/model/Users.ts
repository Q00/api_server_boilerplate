import { Column, Entity, Unique, OneToOne, OneToMany } from 'typeorm';
import {
  IsInt,
  IsString,
  IsDate,
  IsUrl,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator';
import { BaseModel } from './BaseModel';
import { UserAccount } from './UserAccounts';
import { ExampleBoard, ExampleBoardComment, ExampleBoardDepthComment } from '.';

// you can add column in user model if you want

@Entity()
@Unique(['nickname', 'phone', 'email'])
export class User extends BaseModel {
  @Column({ length: 45 })
  @IsInt()
  public nickname!: string; // 닉네임

  @Column({ length: 10 })
  @IsString()
  public name!: string;

  @Column({ type: 'date' })
  @IsDate()
  public birthday!: Date;

  @Column({ length: 200 })
  @IsUrl()
  public profile!: string;

  @Column({ length: 25 })
  @IsPhoneNumber('KR')
  public phone!: string;

  @Column({ length: 35 })
  @IsEmail()
  public email!: string;

  @OneToOne(
    // eslint-disable-next-line no-unused-vars
    (_) => UserAccount,
    (userAccount) => userAccount.user,
  )
  public userAccount!: UserAccount;

  @OneToMany(
    (_) => ExampleBoard,
    (board) => board.user,
  )
  public normalBoards!: ExampleBoard[];

  @OneToMany(
    (_) => ExampleBoardComment,
    (comment) => comment.user,
  )
  public normalBoardComments!: ExampleBoardComment[];

  @OneToMany(
    (_) => ExampleBoardDepthComment,
    (comment) => comment.user,
  )
  public normalBoardDepthComments!: ExampleBoardDepthComment[];
}