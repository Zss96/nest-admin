import { OmitType } from '@nestjs/swagger';
import { Role } from '../entities/role.entity';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class ReqAddRoleDto extends OmitType(Role, ['id'] as const) {
  @IsArray()
  menuIds: number[];
}

export class ReqUpdateRoleDto extends ReqAddRoleDto {
  @Type()
  @IsNumber()
  id: number;
}

export class ReqRoleListDto extends PaginationDto {
  @IsOptional()
  @IsString()
  role_name?: string;

  @IsOptional()
  @IsString()
  key?: string;

  @IsOptional()
  @IsNumber()
  status?: number;
}
