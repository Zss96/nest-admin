import { MenuService } from './../menu/menu.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import {
  ReqAddRoleDto,
  ReqRoleListDto,
  ReqUpdateRoleDto,
} from './dto/req-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { User } from '../users/entities/user.entity';
import { ApiException } from 'src/common/exceptions/api.exception';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => MenuService))
    private readonly menuService: MenuService,
  ) {}

  //通过名字查找
  async getRoleFormName(role_name: string) {
    return await this.roleRepository.find({
      where: {
        role_name,
      },
    });
  }

  //添加role
  async addRole(reqAddRoleDto: ReqAddRoleDto) {
    const role = await this.getRoleFormName(reqAddRoleDto.role_name);
    if (role) throw new ApiException('该角色名已经存在');
    const menus = await this.menuService.getMenuByIds(reqAddRoleDto.menuIds);
    reqAddRoleDto.menus = menus;
    return await this.roleRepository.save(reqAddRoleDto);
  }

  //删除
  async delete(id: number) {
    this.roleRepository
      .createQueryBuilder('Role')
      .delete()
      .from(Role)
      .where('id=:id', { id })
      .execute();
  }

  //更新role
  async updateRole(reqUpdateRoleDto: ReqUpdateRoleDto) {
    const menus = await this.menuService.getMenuByIds(reqUpdateRoleDto.menuIds);
    reqUpdateRoleDto.menus = menus;
    return await this.roleRepository.save(reqUpdateRoleDto);
  }

  //获取详情
  async getRoleId(id: number) {
    return await this.roleRepository.findOneBy({ id });
  }

  async getList(reqRoleListDto: ReqRoleListDto) {
    const where: FindOptionsWhere<Role> = {};
    if (reqRoleListDto.role_name) {
      where.role_name = Like(`%${reqRoleListDto.role_name}%`);
    }

    if (reqRoleListDto.key) {
      where.key = Like(`%${reqRoleListDto.key}%`);
    }
    if (reqRoleListDto.status) {
      where.status = reqRoleListDto.status;
    }

    const result = await this.roleRepository.findAndCount({
      where,
      order: {
        order: 1,
        create_time: 1,
      },
      skip: reqRoleListDto.limit,
      take: (reqRoleListDto.page - 1) * reqRoleListDto.limit,
    });

    return {
      result: [0],
      total: result[1],
    };
  }

  //通过ids查找role
  async getRoleByIds(ids: number[]) {
    return this.roleRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
