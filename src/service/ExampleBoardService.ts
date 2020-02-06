import { Service } from 'typedi';
import { BaseBoardService } from './BaseBoardService';
import { IboardDTO } from './BaseBoardService';
import { ExampleBoard, User } from '../model';

export interface IexampleBoardDTO extends IboardDTO {
  user: User;
}

@Service()
export class ExampleBoardService extends BaseBoardService<ExampleBoard> {
  constructor() {
    super(ExampleBoard);
  }

  async save(
    board: Pick<IexampleBoardDTO, 'title' | 'content' | 'user'>,
  ): Promise<ExampleBoard> {
    return this.genericRepository.save({
      title: board.title,
      content: board.content,
      user: board.user!,
    });
  }

  async getByUserId(userId: number): Promise<ExampleBoard[]> {
    return super.getByWhere({ user: userId }, [
      /*"normalBoardComments"*/ 'user',
    ]) as Promise<ExampleBoard[]>;
  }
}
