import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class PaginationDto {
  //页数
  @IsOptional()
  @Type()
  @IsNumber()
  page?: number = 1;
  //每页条数
  @IsOptional()
  @Type()
  @IsNumber()
  limit?: number = 5000;
  //排序字段
  @IsOptional()
  @Type()
  @IsString()
  orderByColumn?: string = 'created_time';

  //排序方法 ASC DESC
  @IsOptional()
  @Type()
  @IsString()
  orderType?: string = 'ASC';

  /* mysql忽略条数 */
  @ApiHideProperty()
  public skip: number;
  /* mysql返回条数 */
  @ApiHideProperty()
  public take: number;
}
