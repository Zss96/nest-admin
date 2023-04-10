import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  // id
  @PrimaryGeneratedColumn()
  user_id: number;

  // 账号

  @Column({
    length: 30,
  })
  @IsString()
  user_name: string;

  //加密后密码
  @ApiHideProperty()
  @Column({
    comment: '加密后密码',
    length: 100,
    default: '',
    select: false,
  })
  @IsString()
  password: string;

  // 加密盐
  @Column('text', { select: false })
  salt?: string;

  //用户姓名
  @Column({
    length: 30,
  })
  @IsString()
  nick_name: string;

  //性别
  @Column({
    comment: '用户性别，0男 1女， 2未知',
    default: 0,
  })
  @IsOptional()
  gender: number;

  //电话
  @Column({
    length: 11,
    default: null,
  })
  @IsOptional()
  phone?: string;
  //邮箱
  @Column({
    length: 50,
    default: null,
  })
  @IsOptional()
  email?: string;

  @Column({
    comment: '账号状态（1正常，0停用)',
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  status: string;
}
