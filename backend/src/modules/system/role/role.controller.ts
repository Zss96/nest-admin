import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { ReqAddRoleDto } from './dto/req-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('角色')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post()
  addRole(@Body() reqAddRoleDto: ReqAddRoleDto) {
    this.roleService.addRole(reqAddRoleDto);
  }
  @Get('list')
  getList() {
    this.roleService.getList();
  }
}
