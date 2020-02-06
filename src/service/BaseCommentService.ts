import { BaseService } from './BaseService';
import { BaseComment, User } from '../model';
import { ObjectType } from './BaseService';
export interface IcommentDTO {
  comment: string;
  boardId: number;
  user: User;
}

export interface IdepthCommentDTO {
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
  async updateReportCount(id: number): Promise<BaseComment> {
    const comment = await (this.getById(id) as Promise<Partial<BaseComment>>);
    const newComment: Partial<BaseComment> = {
      reportCount: Number(comment?.reportCount) + 1,
    };
    return this.genericRepository.save({ ...comment, ...newComment } as object);
  }

  async update(id: number, comment: string): Promise<BaseComment> {
    const oldComment = await (this.getById(id) as Promise<T>);
    const newComment: Partial<BaseComment> = {
      comment,
    };

    return this.genericRepository.save({
      ...oldComment,
      ...newComment,
    } as object);
  }
}
