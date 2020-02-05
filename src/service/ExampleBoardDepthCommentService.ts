import { Service, Container } from 'typedi';
import { BaseCommentService, IDepthCommentDTO } from './BaseCommentService';
import { ExampleBoardDepthComment } from '../model';
import { ExampleBoardCommentService } from './ExampleBoardCommentService';

@Service()
export class ExampleBoardDepthCommentService extends BaseCommentService<
  ExampleBoardDepthComment
> {
  constructor() {
    super(ExampleBoardDepthComment);
  }

  public async createOrUpdate(
    depthComment: IDepthCommentDTO,
  ): Promise<ExampleBoardDepthComment> {
    const normalBoardCommentService = Container.get(ExampleBoardCommentService);
    const parentComment = await normalBoardCommentService.getById(
      depthComment.commentId,
    );
    return this.genericRepository.save({
      comment: depthComment.comment,
      ref: parentComment,
      user: depthComment.user,
    }) as Promise<ExampleBoardDepthComment>;
  }
}
