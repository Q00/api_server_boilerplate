import {
  CreateDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
  ValueTransformer,
  Column,
} from 'typeorm';
import { IsInt, IsDate } from 'class-validator';

const bigIntTransformer: ValueTransformer = {
  to: (entitiyValue: bigint) => entitiyValue,
  from: (databaseValue: string) => Number(databaseValue),
};

export abstract class BaseModel {
  @IsInt()
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', transformer: [bigIntTransformer] })
  id!: number;

  @IsDate()
  @CreateDateColumn()
  createdAt!: Date;

  @IsDate()
  @UpdateDateColumn()
  updatedAt!: Date;

  @IsDate()
  @Column({ nullable: true, type: 'date', default: null })
  deletedAt?: Date | null;
}
