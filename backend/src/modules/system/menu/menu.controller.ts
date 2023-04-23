import { MenuService } from './menu.service';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ReqAddMenuDto,
  ReqMenuListDto,
  UpdateMenuDto,
} from './dto/req-menu.dto';

@ApiTags('菜单')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async add(@Body() reqAddMenuDto: ReqAddMenuDto) {
    this.menuService.addMenu(reqAddMenuDto);
  }

  @Put()
  async update(@Body() updateMenuDto: UpdateMenuDto) {
    this.menuService.updateMenu(updateMenuDto);
  }

  @Get('list')
  async getList(@Query() reqMenuListDto: ReqMenuListDto) {
    return this.menuService.getList(reqMenuListDto);
  }

  @Get(':id')
  async getMenuById(@Param() id: number) {
    return this.menuService.findById(id);
  }
}
