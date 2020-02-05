import { Service, Container } from 'typedi';
import { BaseCommentService, ICommentDTO } from './BaseCommentService';
import { ExampleBoard, ExampleBoardComment } from '../model';
import { ExampleBoardService } from './ExampleBoardService';

@Service()
export class ExampleBoardCommentService extends BaseCommentService<
  ExampleBoardComment
> {
  constructor() {
    super(ExampleBoardComment);
  }

  public async save(comment: ICommentDTO): Promise<ExampleBoardComment> {
    const normalBoardService = Container.get(ExampleBoardService);
    const normalBoard = (await normalBoardService.getById(
      comment.boardId,
    )) as ExampleBoard;
    return await this.genericRepository.save({
      comment: comment.comment,
      normalBoard: normalBoard,
      user: comment.user,
    });
  }
}
