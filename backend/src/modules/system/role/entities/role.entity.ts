import { IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Menu } from '../../menu/entities/menu.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({
    comment: '角色名称',
  })
  @IsString()
  role_name: string;

  @Column({
    comment: '角色权限字符',
  })
  @IsString()
  key: string;

  @Column({
    comment: '排序',
  })
  @IsNumber()
  order: number;

  @Column({
    comment: '状态(1正常，0停用)',
  })
  status: number;

  @ApiHideProperty()
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ApiHideProperty()
  @ManyToMany(() => Menu, (menu) => menu.roles)
  @JoinColumn()
  menus: Menu[];
}
