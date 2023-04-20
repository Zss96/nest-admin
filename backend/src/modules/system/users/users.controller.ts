import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ReqAddUserDto,
  ReqUpdateUserDto,
  ReqUserListDto,
} from './dto/req-user.dto';

@ApiTags('用户管理')
@Controller('user')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async addUser(@Body() reqAddUserDto: ReqAddUserDto) {
    return await this.usersService.addUser(reqAddUserDto);
  }
  @Put()
  async editUser(@Body() reqUpdateUserDto: ReqUpdateUserDto) {
    return await this.usersService.updateUser(reqUpdateUserDto);
  }

  @Get('list')
  async getList(@Query() reqUserListDto: ReqUserListDto) {
    return await this.usersService.getList(reqUserListDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserId(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.usersService.delete(id);
  }
}
