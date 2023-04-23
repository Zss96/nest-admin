import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsArray, IsOptional, IsString, isNumber } from 'class-validator';
import { Type } from 'class-transformer';

//添加用户
export class ReqAddUserDto extends OmitType(User, ['id'] as const) {
  /* 角色Id数组 */
  @IsArray()
  roleIds: number[];
}

//更新用户
export class ReqUpdateUserDto extends OmitType(User, [
  'password',
  'salt',
] as const) {
  @IsArray()
  roleIds: number[];
}

export class ReqUserListDto extends PaginationDto {
  @IsOptional()
  @Type()
  @IsString()
  user_name?: string;

  @IsOptional()
  @Type()
  @IsString()
  phone?: string;
}
