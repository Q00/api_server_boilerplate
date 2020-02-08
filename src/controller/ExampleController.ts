import {
  JsonController,
  HttpCode,
  Get,
  QueryParam,
  InternalServerError,
} from 'routing-controllers';
import { BaseController } from './BaseController';
import { ExampleBoardService } from '../service';
import { ResponseSchema } from 'routing-controllers-openapi';
import { ExampleBoard } from '../model';

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
}
