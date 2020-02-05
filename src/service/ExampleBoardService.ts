import { Service } from 'typedi';
import { BaseBoardService } from './BaseBoardService';
import { IBoardDTO } from './BaseBoardService';
import { ExampleBoard, User } from '../model';

export interface IExampleBoardDTO extends IBoardDTO {
  user: User;
}

@Service()
export class ExampleBoardService extends BaseBoardService<ExampleBoard> {
  constructor() {
    super(ExampleBoard);
  }

  public async save(
    board: Pick<IExampleBoardDTO, 'title' | 'content' | 'user'>,
  ): Promise<ExampleBoard> {
    return this.genericRepository.save({
      title: board.title,
      content: board.content,
      user: board.user!,
    });
  }

  public async getByUserId(userId: number): Promise<ExampleBoard[]> {
    return super.getByWhere({ user: userId }, [
      /*"normalBoardComments"*/ 'user',
    ]) as Promise<ExampleBoard[]>;
  }
}
