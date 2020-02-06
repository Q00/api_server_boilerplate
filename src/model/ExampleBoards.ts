import { Entity, OneToMany, ManyToOne } from 'typeorm';
import { BaseBoard } from './BaseBoard';
import { ExampleBoardComment } from './ExampleBoardComments';
import { User } from './Users';
import { IsObject } from 'class-validator';

@Entity()
export class ExampleBoard extends BaseBoard {
  @IsObject()
  @ManyToOne(
    (_) => User,
    (user) => user.id,
    { nullable: false },
  )
  user!: User;

  @IsObject()
  @OneToMany(
    (_) => ExampleBoardComment,
    (comment) => comment.exampleBoard,
  )
  comments!: ExampleBoardComment[];
}
