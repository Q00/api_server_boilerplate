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
import { User, ExampleBoardDepthComment } from '../model';
import { ExampleBoardDepthCommentService } from '../service';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import express from 'express';
import { IcommentDTOClass } from '../dto/commentDTO';

@JsonController('/example_board_depth_comment')
export class ExampleBoardDepthCommentController extends BaseCommentController<
  ExampleBoardDepthComment,
  ExampleBoardDepthCommentService
> {
  constructor(
    private exampleBoardDepthCommentService: ExampleBoardDepthCommentService,
  ) {
    super(exampleBoardDepthCommentService);
  }

  @Post('/:comment_id')
  @OpenAPI({
    summary: 'save exampleBoardDepthComment',
    description: ' comment: string; commentId: number; user: User;',
    security: [{ bearerAuth: [] }], // Applied to each method
  })
  @ResponseSchema(ExampleBoardDepthComment, {
    isArray: false,
    statusCode: '201',
  })
  async save(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Pick<IcommentDTOClass, 'comment'>,
    @Param('comment_id') commentId: number,
  ) {
    return this.exampleBoardDepthCommentService.createOrUpdate({
      comment: body.comment,
      commentId,
      user,
    });
  }

  @Put('/:depth_comment_id')
  @OpenAPI({
    summary: 'edit exampleBoardComment',
    description: ' comment: string; boardId: number; user: User;',
    security: [{ bearerAuth: [] }], // Applied to each method
  })
  @ResponseSchema(ExampleBoardDepthComment, {
    isArray: false,
    statusCode: '201',
  })
  async updateComment(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Pick<IcommentDTOClass, 'comment'>,
    @Param('depth_comment_id') id: number,
  ) {
    const oldComment = await this.exampleBoardDepthCommentService.getById(id, [
      'user',
    ]);
    if (oldComment.user.id !== user.id) {
      throw new UnauthorizedError('Unauthorized update depth comment');
    }
    return this.update(id, body.comment);
  }

  @Get('/report/:depth_comment_id')
  @OpenAPI({
    summary: 'report exampleBoardComment',
    description: '',
    security: [{ bearerAuth: [] }], // Applied to each method
  })
  @ResponseSchema(ExampleBoardDepthComment, {
    isArray: false,
    statusCode: '201',
  })
  async reportComment(
    @CurrentUser({ required: true }) user: User,
    @Param('depth_comment_id') commentId: number,
    @Req()
    request: express.Request,
  ) {
    const url = `${request.method}|${request.url}`;
    return this.updateReport(commentId, url, user);
  }

  @Delete('/:depth_comment_id')
  @OpenAPI({
    summary: 'report exampleBoardComment',
    description: '',
    security: [{ bearerAuth: [] }], // Applied to each method
  })
  @ResponseSchema(ExampleBoardDepthComment, {
    isArray: false,
    statusCode: '201',
  })
  async deleteComment(
    @CurrentUser({ required: true }) user: User,
    @Param('depth_comment_id') commentId: number,
  ) {
    const oldComment = await this.exampleBoardDepthCommentService.getById(
      commentId,
      ['user', 'depthComments'],
    );
    if (oldComment.user.id !== user.id) {
      throw new UnauthorizedError('권한이 없습니다.');
    }
    return this.delete(commentId);
  }
}
