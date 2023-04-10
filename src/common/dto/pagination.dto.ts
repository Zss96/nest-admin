import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  //页数
  @IsOptional()
  @Type()
  @IsNumber()
  page?: number;
  //每页条数
  @IsOptional()
  @Type()
  @IsNumber()
  limit?: number;
  //排序字段
  @IsOptional()
  @Type()
  @IsString()
  orderByColumn?: string;

  //排序方法
  @IsOptional()
  @Type()
  @IsString()
  orderType?: string;
}
