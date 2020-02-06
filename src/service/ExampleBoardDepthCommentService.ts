import { Service, Container } from 'typedi';
import { BaseCommentService, IdepthCommentDTO } from './BaseCommentService';
import { ExampleBoardDepthComment } from '../model';
import { ExampleBoardCommentService } from './ExampleBoardCommentService';

@Service()
export class ExampleBoardDepthCommentService extends BaseCommentService<
  ExampleBoardDepthComment
> {
  constructor() {
    super(ExampleBoardDepthComment);
  }

  async createOrUpdate(
    depthComment: IdepthCommentDTO,
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
