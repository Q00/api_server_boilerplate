import { Column } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { BaseModel } from './BaseModel';

// you can extends this class making child board and add user

export abstract class BaseBoard extends BaseModel {
  @Column({ length: 50 })
  @IsString()
  public title!: string;

  @IsString()
  @Column({ type: 'text' })
  public content!: string;

  @IsInt()
  @Column({ default: 0 })
  public reportCount!: number;
}
