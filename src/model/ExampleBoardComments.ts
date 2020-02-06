import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseComment } from './BaseComment';
import { ExampleBoard } from './ExampleBoards';
import { User } from './Users';
import { ExampleBoardDepthComment } from './ExampleBoardDepthComments';
import { IsObject } from 'class-validator';

@Entity()
export class ExampleBoardComment extends BaseComment {
  @IsObject()
  @ManyToOne(
    (_) => ExampleBoard,
    (board) => board.id,
    { nullable: false },
  )
  exampleBoard!: ExampleBoard;

  @OneToMany(
    (_) => ExampleBoardDepthComment,
    (comment) => comment.ref,
  )
  depthComments!: ExampleBoardDepthComment[];

  @ManyToOne(
    (_) => User,
    (user) => user.id,
    { nullable: false },
  )
  @IsObject()
  user!: User;
}
