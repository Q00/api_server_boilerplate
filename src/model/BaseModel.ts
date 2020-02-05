import {
  CreateDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';
import { IsInt, IsDate } from 'class-validator';

const bigIntTransformer: ValueTransformer = {
  to: (entitiyValue: bigint) => entitiyValue,
  from: (databaseValue: string) => parseInt(databaseValue, 10),
};

export abstract class BaseModel {
  @IsInt()
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', transformer: [bigIntTransformer] })
  public id!: number;

  @IsDate()
  @CreateDateColumn()
  public createdAt!: Date;

  @IsDate()
  @UpdateDateColumn()
  public updatedAt!: Date;
}
