import { Service } from 'typedi';
import { BaseService, ObjectType, listForm } from './BaseService';
import { BaseBoard } from '../model/BaseBoard';
import { Like, IsNull } from 'typeorm';

export interface IboardDTO {
  title: string;
  content: string;
  reportCount: number;
}

const listForm = Promise;

@Service()
export abstract class BaseBoardService<T extends BaseBoard> extends BaseService<
  T
> {
  constructor(repo: ObjectType<T>) {
    super(repo);
  }

  async getBoardList(page: number, query?: string): listForm<T> {
    if (Number.isNaN(page) || page === undefined) {
      page = 1;
    }
    const size = 10;
    const begin = (page - 1) * size;

    let boardList;
    if (query) {
      boardList = await this.getByWhere(
        [
          {
            title: Like(`%${query}%`),
            deletedAt: IsNull(),
          },
          {
            content: Like(`%${query}%`),
            deletedAt: IsNull(),
          },
        ],
        ['user'],
        begin,
        size,
      );
    } else {
      boardList = await this.list(['user'], begin, size);
    }

    return { array: boardList[0], total: boardList[1] };
  }
  async updateReportCount(id: number): Promise<BaseBoard> {
    const board = await (this.getById(id) as Promise<T>);
    const newBoard: Pick<BaseBoard, 'reportCount'> = {
      reportCount: board.reportCount + 1,
    };
    return this.genericRepository.save({ ...board, ...newBoard } as object);
  }
}
