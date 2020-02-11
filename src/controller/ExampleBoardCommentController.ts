import {
  JsonController,
  Post,
  CurrentUser,
  Body,
  Put,
  UnauthorizedError,
  Get,
  Req,
  Param,
  Delete,
} from 'routing-controllers';
import { BaseCommentController } from './BaseCommentController';
import { ExampleBoardComment, User } from '../model';
import { ExampleBoardCommentService } from '../service';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import express from 'express';
import { IcommentDTOClass } from '../dto/commentDTO';

@JsonController('/example_board_comment')
export class ExampleBoardCommentController extends BaseCommentController<
  ExampleBoardComment,
  ExampleBoardCommentService
> {
  constructor(private exampleBoardCommentService: ExampleBoardCommentService) {
    super(exampleBoardCommentService);
  }

  @Post()
  @OpenAPI({
    summary: 'save exampleBoardComment',
    description: ' comment: string; boardId: number; user: User;',
    security: [{ bearerAuth: [] }], // Applied to each method
  })
  @ResponseSchema(ExampleBoardComment, {
    isArray: false,
    statusCode: '201',
  })
  async save(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Pick<IcommentDTOClass, 'comment' | 'boardId'>,
  ) {
    return this.exampleBoardCommentService.save({
      comment: body.comment,
      boardId: body.boardId,
      user,
    });
  }

  @Put('/:comment_id')
  @OpenAPI({
    summary: 'edit exampleBoardComment',
    description: ' comment: string; boardId: number; user: User;',
    security: [{ bearerAuth: [] }], // Applied to each method
  })
  @ResponseSchema(ExampleBoardComment, {
    isArray: false,
    statusCode: '201',
  })
  async updateComment(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Pick<IcommentDTOClass, 'comment'>,
    @Param('comment_id') id: number,
  ) {
    const oldComment = await this.exampleBoardCommentService.getById(id, [
      'user',
    ]);
    if (oldComment.user.id !== user.id) {
      throw new UnauthorizedError('Unauthorized update comment');
    }
    return this.update(id, body.comment);
  }

  @Get('/report/:comment_id')
  @OpenAPI({
    summary: 'report exampleBoardComment',
    description: '',
    security: [{ bearerAuth: [] }], // Applied to each method
  })
  @ResponseSchema(ExampleBoardComment, {
    isArray: false,
    statusCode: '201',
  })
  async reportComment(
    @CurrentUser({ required: true }) user: User,
    @Param('comment_id') commentId: number,
    @Req()
    request: express.Request,
  ) {
    const url = `${request.method}|${request.url}`;
    return this.updateReport(commentId, url, user);
  }

  @Delete('/:comment_id')
  @OpenAPI({
    summary: 'report exampleBoardComment',
    description: '',
    security: [{ bearerAuth: [] }], // Applied to each method
  })
  @ResponseSchema(ExampleBoardComment, {
    isArray: false,
    statusCode: '201',
  })
  async deleteComment(
    @CurrentUser({ required: true }) user: User,
    @Param('comment_id') commentId: number,
  ) {
    const oldComment = await this.exampleBoardCommentService.getById(
      commentId,
      ['user', 'depthComments'],
    );
    if (oldComment.user.id !== user.id) {
      throw new UnauthorizedError('Unathorized delete comment');
    } else if (oldComment.depthComments.length !== 0) {
      return this.update(commentId, '[This is deleted comment.]');
    }
    return this.delete(commentId);
  }
}
