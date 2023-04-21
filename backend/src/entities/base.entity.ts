import { ApiHideProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class BaseEntity {
  // id
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  //创建时间
  @CreateDateColumn()
  @ApiHideProperty()
  create_time: Date | string;

  //更新时间
  @UpdateDateColumn()
  @ApiHideProperty()
  update_time: Date | string;

  //创建人
  @Column({ length: 30, default: '' })
  @ApiHideProperty()
  create_by: string;

  //最后更新人
  @Column({ length: 30, default: '' })
  @ApiHideProperty()
  update_by: string;

  // @Column({
  //   type: 'text',
  //   default: '',
  // })
  // @IsOptional()
  // remark?: string;
}
