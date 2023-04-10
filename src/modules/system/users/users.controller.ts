import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReqAddUserDto, ReqUserListDto } from './dto/req-user.dto';

@ApiTags('用户管理')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async addUser(@Body() reqAddUserDto: ReqAddUserDto) {
    return await this.usersService.addUser(reqAddUserDto);
  }
  @Get('list')
  async getList(@Query() reqUserListDto: ReqUserListDto) {
    return await this.usersService.getList(reqUserListDto);
  }
}
