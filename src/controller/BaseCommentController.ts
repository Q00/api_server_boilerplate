import { BaseController } from './BaseController';
import { BaseCommentService } from '../service/BaseCommentService';
import { BaseComment, User } from '../model';
import { NotFoundError, NotAcceptableError } from 'routing-controllers';
import Container from 'typedi';
import { ApiLogService } from '../service';

export abstract class BaseCommentController<
  U extends BaseComment,
  T extends BaseCommentService<U>
> extends BaseController {
  protected service: T;
  constructor(service: T) {
    super();
    this.service = service;
  }

  protected async update(id: number, comment: string): Promise<BaseComment> {
    const _comment = this.service.getById(id);
    if (!_comment) throw new NotFoundError('this commment is undefined');
    return this.service.update(id, comment);
  }

  protected async updateReport(
    id: number,
    url: string,
    user: User,
  ): Promise<BaseComment> {
    const apiLogService = Container.get(ApiLogService);
    const log = await apiLogService.getByWhere({ user, log: url });
    if (log.length !== 0) {
      throw new NotAcceptableError('Already report comment');
    }
    const _comment = this.service.getById(id);

    if (!_comment) throw new NotFoundError('this commment is undefined');
    return this.service.updateReportCount(id);
  }

  protected async delete(id: number): Promise<BaseComment> {
    const _comment = this.service.getById(id);
    if (!_comment) throw new NotFoundError('this commment is undefined');
    return this.service.softDelete(id);
  }
}
