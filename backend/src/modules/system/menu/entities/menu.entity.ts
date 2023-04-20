import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Menu extends BaseEntity {
  // 菜单名称
  @Column()
  @IsString()
  menu_name: string;

  //排序
  @IsNumber()
  order: number;

  //路由地址
  @Column()
  @IsString()
  path: string;

  //组件路径
  @IsString()
  component?: string;

  //路由参数
  @IsString()
  query?: string;

  //外链
  @IsNumber()
  isFrame: number;

  //是否缓存
  @IsNumber()
  isCache?: number;

  //菜单类型
  @Column({
    comment: '菜单类型（M目录，C菜单，F按钮）',
    length: 1,
  })
  @IsString()
  menuType: string;

  @Column({
    comment: '菜单状态(0显示，1隐藏)',
  })
  @IsString()
  visible?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
