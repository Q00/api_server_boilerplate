import { Column } from 'typeorm';
import { BaseModel } from './BaseModel';
import { IsString, MaxLength, IsInt } from 'class-validator';

// you can extends this class making child comment and add user

export abstract class BaseComment extends BaseModel {
  @Column({ length: 50 })
  @IsString()
  @MaxLength(50)
  comment!: string;

  @Column({ default: 0 })
  @IsInt()
  reportCount!: number;
}
