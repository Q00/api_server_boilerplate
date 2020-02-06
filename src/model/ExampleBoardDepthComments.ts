import { Entity, ManyToOne } from 'typeorm';
import { BaseComment } from './BaseComment';
import { ExampleBoardComment } from './ExampleBoardComments';
import { User } from './Users';
import { IsObject } from 'class-validator';

@Entity()
export class ExampleBoardDepthComment extends BaseComment {
  @IsObject()
  @ManyToOne(
    (_) => ExampleBoardComment,
    (comment) => comment.id,
    { nullable: false },
  )
  ref!: ExampleBoardComment;

  @IsObject()
  @ManyToOne(
    (_) => User,
    (user) => user.id,
    { nullable: false },
  )
  user!: User;
}
