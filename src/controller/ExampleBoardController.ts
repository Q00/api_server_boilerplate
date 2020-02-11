import {
  JsonController,
  HttpCode,
  Get,
  QueryParam,
  InternalServerError,
  Param,
  NotFoundError,
  Post,
  CurrentUser,
  Body,
  Delete,
  UnauthorizedError,
} from 'routing-controllers';
import { BaseController } from './BaseController';
import { ExampleBoardService } from '../service';
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi';
import { ExampleBoard, User } from '../model';
import { IboardDTOClass } from '../dto/BoardDTO';

@JsonController('/board')
export class BoardController extends BaseController {
  constructor(private exampleBoardService: ExampleBoardService) {
    super();
  }
  @HttpCode(200)
  @Get('/example')
  @ResponseSchema(ExampleBoard, {
    description: 'A list of exampleBoard objects',
    isArray: true,
    statusCode: '200',
  })
  async exampleBoardList(
    @QueryParam('page') take: number,
    @QueryParam('query') query?: string,
  ) {
    try {
      return await this.exampleBoardService.getBoardList(take, query);
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  @HttpCode(200)
  @ResponseSchema(ExampleBoard, {
    description: 'get exampleBoard by id',
    isArray: false,
    statusCode: '200',
  })
  @Get('/example/:id')
  async getExampleBoard(@Param('id') id: number) {
    const board = await this.exampleBoardService.getById(id, [
      'user',
      'comments',
      'comments.user',
      'comments.depthComments',
      'comments.depthComments.user',
    ]);
    if (board === undefined) {
      throw new NotFoundError(`can not get example board id ${id}`);
    }
    return board;
  }

  @Post('/example')
  @HttpCode(201)
  // if you want to use jwt token execution in swagger, put this line below
  @OpenAPI({
    security: [{ bearerAuth: [] }], // Applied to each method
  })
  @ResponseSchema(ExampleBoard, {
    description: 'write exampleBoard Body: title:string, content: string',
    isArray: false,
    statusCode: '201',
  })
  async writeExampleBoard(
    @CurrentUser({ required: true }) user: User,
    // this makes Request schema in swagger
    @Body() body: IboardDTOClass,
  ) {
    const board = await this.exampleBoardService.save({
      title: body.title,
      content: body.content,
      user,
    });
    return board;
  }
  @HttpCode(204)
  @Delete('/example/:id')
  @OpenAPI({
    security: [{ bearerAuth: [] }], // Applied to each method
    summary: 'soft delete example board',
    description:
      'return { result: true content:{}} or { result: false, content: {} } ',
  })
  async deleteExampleBoard(@Param('id') id: number, @CurrentUser() user: User) {
    const board = await this.exampleBoardService.getById(id);
    if (board.user.id !== user.id) {
      throw new UnauthorizedError('Unauthorized delete board');
    }

    const deleteBoard = await this.exampleBoardService.softDelete(board.id);
    if (deleteBoard.deletedAt == null) {
      throw new InternalServerError('db transaction error');
    }
    return {};
  }
}
