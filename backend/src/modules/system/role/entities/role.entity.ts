import { IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  key: string;

  @Column()
  @IsNumber()
  order: number;

  // @ManyToMany(() => Menu, (menu) => menu.roles)
  @ApiHideProperty()
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
