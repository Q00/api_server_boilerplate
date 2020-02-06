import { Service, Container } from 'typedi';
import { BaseCommentService, IcommentDTO } from './BaseCommentService';
import { ExampleBoard, ExampleBoardComment } from '../model';
import { ExampleBoardService } from './ExampleBoardService';

@Service()
export class ExampleBoardCommentService extends BaseCommentService<
  ExampleBoardComment
> {
  constructor() {
    super(ExampleBoardComment);
  }

  async save(comment: IcommentDTO): Promise<ExampleBoardComment> {
    const normalBoardService = Container.get(ExampleBoardService);
    const normalBoard = (await normalBoardService.getById(
      comment.boardId,
    )) as ExampleBoard;
    return this.genericRepository.save({
      comment: comment.comment,
      normalBoard,
      user: comment.user,
    });
  }
}
