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
import { RoleService } from './role.service';
import {
  ReqAddRoleDto,
  ReqUpdateRoleDto,
  ReqRoleListDto,
} from './dto/req-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('角色')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get('list')
  async getList(@Query() reqRoleListDto: ReqRoleListDto) {
    return await this.roleService.getList(reqRoleListDto);
  }
  @Post()
  async addRole(@Body() reqAddRoleDto: ReqAddRoleDto) {
    return await this.roleService.addRole(reqAddRoleDto);
  }

  @Put()
  async updateRole(@Body() reqUpdateRoleDto: ReqUpdateRoleDto) {
    return await this.roleService.updateRole(reqUpdateRoleDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.roleService.getRoleId(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.roleService.delete(id);
  }
}
