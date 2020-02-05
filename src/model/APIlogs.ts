import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import { User } from './Users';
import { IsString, IsObject, IsInt, IsEnum, IsUrl } from 'class-validator';
import { Method } from './Enum';

@Entity()
export class APILog extends BaseModel {
  @IsString()
  @Column({ type: 'text', nullable: true })
  public log?: string;

  @IsEnum(Method)
  @Column({ type: 'enum', enum: Method })
  public method!: Method;

  @IsUrl()
  @Column({ type: 'text' })
  public url!: string;

  @IsObject()
  @ManyToOne(
    (_) => User,
    (user) => user.id,
  )
  public user!: User;

  @IsInt()
  @Column()
  public responseTime!: number;
}
