import { SharedService } from './../../../shared/shared.service';
import { ReqUpdateRoleDto } from './../role/dto/req-role.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';
import {
  ReqAddMenuDto,
  ReqMenuListDto,
  UpdateMenuDto,
} from './dto/req-menu.dto';
import { ApiException } from 'src/common/exceptions/api.exception';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    private readonly sharedService: SharedService,
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
    const menu = await this.findById(updateMenuDto.id);
    if (!menu) throw new ApiException('菜单不存在');
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

  //删除
  async delete(id: number) {
    await this.menuRepository
      .createQueryBuilder('menu')
      .delete()
      .from(Menu)
      .where('id=:id', { id })
      .execute();
  }

  async getList(reqMenuListDto: ReqMenuListDto) {
    const where: FindOptionsWhere<Menu> = {};
    if (reqMenuListDto.menu_name) {
      where.menu_name = Like(`%${reqMenuListDto.menu_name}%`);
    }
    if (reqMenuListDto.status) {
      where.status = reqMenuListDto.status;
    }
    return await this.menuRepository
      .createQueryBuilder('menu')
      .where(where)
      .orderBy('menu.order', 'ASC')
      .addOrderBy('menu.create_time', 'ASC')
      .getRawMany();
  }

  async findById(id: number) {
    return this.menuRepository.findOneBy({ id });
  }

  async getTree() {
    const menus = await this.menuRepository
      .createQueryBuilder('menu')
      .select('menu.id', 'id')
      .addSelect('menu.menu_name', 'label')
      .addSelect('menu.parentId', 'parentId')
      .orderBy('menu.order', 'ASC')
      .getRawMany();

    return this.sharedService.handleTree(menus);
  }

  async getMenuByIds(ids: number[]) {
    return await this.menuRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async getAllPermsByRoles(ids: number[]) {
    const menuList = await this.menuRepository
      .createQueryBuilder('menu')
      .select('menu.perms')
      .innerJoin('menu.roles', 'role')
      .where('menu.perms is not null')
      .andWhere("menu.perms !=''")
      .andWhere('role.status = 0 and role.id IN(:...ids)', {
        ids,
      })
      .getMany();
    return menuList.map((item) => item.perms);
  }
}
