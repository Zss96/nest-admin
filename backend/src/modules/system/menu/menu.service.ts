import { ReqUpdateRoleDto } from './../role/dto/req-role.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { In, Repository } from 'typeorm';
import { ReqAddMenuDto, UpdateMenuDto } from './dto/req-menu.dto';
import { ApiException } from 'src/common/exceptions/api.exception';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {}

  //通过名字查询菜单
  async findByName(menu_name: string) {
    return await this.menuRepository.findOneBy({
      menu_name,
    });
  }

  //增加菜单
  async addMenu(reqAddMenuDto: ReqAddMenuDto) {
    const menu = await this.findByName(reqAddMenuDto.menu_name);
    if (menu) throw new ApiException('菜单名称已存在');
    return await this.save(reqAddMenuDto);
  }

  //修改菜单
  async updateMenu(updateMenuDto: UpdateMenuDto) {
    return await this.save(updateMenuDto);
  }

  //保存菜单
  async save(reqAddMenuDto: ReqAddMenuDto) {
    if (reqAddMenuDto.parentId) {
      const parentMenu = await this.findById(reqAddMenuDto.parentId);
      reqAddMenuDto.parent = parentMenu;
    }
    await this.menuRepository.save(reqAddMenuDto);
  }

  async findById(id: number) {
    return this.menuRepository.findOneBy({ id });
  }

  async getMenuByIds(ids: number[]) {
    return this.menuRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
