import { Service } from 'typedi';
import { BaseService, ObjectType, listForm } from './BaseService';
import { BaseBoard } from '../model/BaseBoard';
import { Like, IsNull } from 'typeorm';

export interface IBoardDTO {
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

  public async getBoardList(page: number, query?: string): listForm<T> {
    if (Number.isNaN(page) || page === undefined) {
      page = 1;
    }
    const size = 10;
    const begin = (page - 1) * size;

    let board_list;
    if (query) {
      board_list = await this.getByWhere(
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
      board_list = await this.list(['user'], begin, size);
    }

    return { array: board_list[0], total: board_list[1] };
  }
  public async updateReportCount(id: number): Promise<BaseBoard> {
    const board = await (<Promise<T>>this.getById(id));
    const newBoard: Pick<BaseBoard, 'reportCount'> = {
      reportCount: board.reportCount + 1,
    };
    return this.genericRepository.save({ ...board, ...newBoard } as any);
  }
}
