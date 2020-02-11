import { IsString } from 'class-validator';
import { IboardDTO } from '../service/BaseBoardService';

export class IboardDTOClass implements Pick<IboardDTO, 'title' | 'content'> {
  @IsString()
  title!: string;
  @IsString()
  content!: string;
}
