import { IsString } from 'class-validator';

export class ReqLoginDto {
  @IsString()
  user_name: string;

  @IsString()
  password: string;

  @IsString()
  uuid: string;

  @IsString()
  code: string;
}
