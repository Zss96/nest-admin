import { MenuService } from './menu.service';
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
  @Get('tree')
  async getTree() {
    return this.menuService.getTree();
  }

  @Get(':id')
  async getMenuById(@Param('id') id: number) {
    return this.menuService.findById(id);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.menuService.delete(id);
  }
}
