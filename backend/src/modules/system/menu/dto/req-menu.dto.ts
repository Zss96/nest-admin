import { OmitType } from '@nestjs/swagger';
import { Menu } from '../entities/menu.entity';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReqMenuListDto {
  @IsOptional()
  @IsString()
  menu_name?: string;

  @IsOptional()
  @IsNumber()
  status?: number;
}
export class ReqAddMenuDto extends OmitType(Menu, ['id'] as const) {
  /* 父Id */
  @Type()
  @IsNumber()
  parentId: number;
}
export class UpdateMenuDto extends Menu {
  /* 父Id */
  @Type()
  @IsNumber()
  parentId: number;
}
