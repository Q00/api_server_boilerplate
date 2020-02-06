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
  nickname!: string; // 닉네임

  @Column({ length: 10 })
  @IsString()
  name!: string;

  @Column({ type: 'date' })
  @IsDate()
  birthday!: Date;

  @Column({ length: 200 })
  @IsUrl()
  profile!: string;

  @Column({ length: 25 })
  @IsPhoneNumber('KR')
  phone!: string;

  @Column({ length: 35 })
  @IsEmail()
  email!: string;

  @OneToOne(
    // eslint-disable-next-line no-unused-vars
    (_) => UserAccount,
    (userAccount) => userAccount.user,
  )
  userAccount!: UserAccount;

  @OneToMany(
    (_) => ExampleBoard,
    (board) => board.user,
  )
  normalBoards!: ExampleBoard[];

  @OneToMany(
    (_) => ExampleBoardComment,
    (comment) => comment.user,
  )
  normalBoardComments!: ExampleBoardComment[];

  @OneToMany(
    (_) => ExampleBoardDepthComment,
    (comment) => comment.user,
  )
  normalBoardDepthComments!: ExampleBoardDepthComment[];
}
