import { ApiHideProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/modules/system/role/entities/role.entity';
import {
  Column,
  Entity,
  ManyToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';
@Entity()
@Tree('materialized-path')
export class Menu extends BaseEntity {
  @Column({
    comment: '菜单类型(D目录，M菜单，B按钮)',
  })
  @IsString()
  type: string;

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
  order: number;

  @Column({
    comment: '路由地址',
    length: 200,
    default: '',
  })
  @IsOptional()
  path: string;

  @Column({
    comment: '是否为外链（0是 1否）',
    type: 'int',
    default: 1,
  })
  is_frame: number;

  @Column({
    comment: '菜单图标',
    default: '#',
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @Column({
    comment: '菜单显示状态(1显示，0隐藏)',
    default: 1,
  })
  @IsNumber()
  @IsOptional()
  hidden?: number;

  @Column({
    comment: '菜单状态(1正常,0停用)',
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  status?: number;

  //菜单
  @Column({
    comment: '组件路径',
    length: 255,
    default: null,
  })
  component?: string;

  @Column({
    comment: '权限标识',
    default: null,
  })
  perms?: string;

  @Column({
    comment: '路由参数',
    length: 255,
    default: null,
  })
  @IsOptional()
  @IsString()
  query?: string;

  @Column({
    comment: '是否缓存（1缓存，0不缓存)',
    default: 1,
  })
  @IsOptional()
  @IsString()
  isCache?: number;

  @ApiHideProperty()
  @TreeChildren()
  children: Menu[];

  @ApiHideProperty()
  @TreeParent()
  parent: Menu;

  @ApiHideProperty()
  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];
}
