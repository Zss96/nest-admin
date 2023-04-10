import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ReqAddUserDto extends OmitType(User, ['user_id'] as const) {}

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
