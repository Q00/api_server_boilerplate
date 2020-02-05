import { BaseService } from './BaseService';
import { BaseComment, User } from '../model';
import { ObjectType } from './BaseService';
export interface ICommentDTO {
  comment: string;
  boardId: number;
  user: User;
}

export interface IDepthCommentDTO {
  comment: string;
  commentId: number;
  user: User;
}

export abstract class BaseCommentService<
  T extends BaseComment
> extends BaseService<T> {
  constructor(repo: ObjectType<T>) {
    super(repo);
  }
  public async updateReportCount(id: number): Promise<BaseComment> {
    const comment = await (<Promise<Partial<BaseComment>>>this.getById(id));
    const newComment: Partial<BaseComment> = {
      reportCount: Number(comment?.reportCount) + 1,
    };
    return this.genericRepository.save({ ...comment, ...newComment } as any);
  }

  public async update(id: number, comment: string): Promise<BaseComment> {
    const oldComment = await (<Promise<T>>this.getById(id));
    const newComment: Partial<BaseComment> = {
      comment: comment,
    };

    return this.genericRepository.save({ ...oldComment, ...newComment } as any);
  }
}
