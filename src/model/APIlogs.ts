import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import { User } from './Users';
import { IsString, IsObject, IsInt, IsEnum, IsUrl } from 'class-validator';
import { Method } from './Enum';

@Entity()
export class APILog extends BaseModel {
  @IsString()
  @Column({ type: 'text', nullable: true })
  log?: string;

  @IsEnum(Method)
  @Column({ type: 'enum', enum: Method })
  method!: Method;

  @IsUrl()
  @Column({ type: 'text' })
  url!: string;

  @IsObject()
  @ManyToOne(
    (_) => User,
    (user) => user.id,
  )
  user!: User;

  @IsInt()
  @Column()
  responseTime!: number;
}
