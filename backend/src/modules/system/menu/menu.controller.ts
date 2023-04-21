import { MenuService } from './menu.service';
import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqAddMenuDto, UpdateMenuDto } from './dto/req-menu.dto';

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
}
