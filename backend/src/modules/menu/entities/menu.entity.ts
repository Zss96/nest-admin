import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class Menu extends BaseEntity {
  @Column({
    comment: '菜单名称',
    length: 50,
  })
  @IsString()
  menu_name: string;

  @Column({
    comment: '显示顺序',
  })
  @IsNumber()
  orderNum: number;

  @Column({
    comment: '路由地址',
    length: 200,
    default: '',
  })
  @IsOptional()
  path: string;

  @Column({
    comment: '组件路径',
    length: 255,
    default: null,
  })
  component?: string;

  @Column({
    comment: '路由参数',
    length: 255,
    default: null,
  })
  @IsOptional()
  @IsString()
  query?: string;

  @Column({
    comment: '是否为外链（0是 1否）',
    type: 'int',
    default: 1,
  })
  is_frame: number;
}
