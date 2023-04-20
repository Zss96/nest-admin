import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from 'src/common/utils/crypto.util';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import {
  ReqAddUserDto,
  ReqUpdateUserDto,
  ReqUserListDto,
} from './dto/req-user.dto';
import { User } from './entities/user.entity';
import { ApiException } from 'src/common/exceptions/api.exception';
import { RoleService } from '../role/role.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}
  getUserForName(user_name: string) {
    const user = this.userRepository.find({
      select: ['id', 'user_name', 'password', 'salt'],
      where: {
        user_name,
      },
    });
    return user;
  }

  //添加用户
  async addUser(reqAddUserDto: ReqAddUserDto) {
    const user = await this.getUserForName(reqAddUserDto.user_name);
    if (user) throw new ApiException('该用户名已存在');
    const roles = await this.roleService.getRoleByIds(reqAddUserDto.roleIds);
    reqAddUserDto.roles = roles;
    const salt = makeSalt();
    reqAddUserDto.password = encryptPassword(reqAddUserDto.password, salt);
    reqAddUserDto.salt = salt;
    try {
      return await this.userRepository.save(reqAddUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  //编辑用户
  async updateUser(reqUpdateUserDto: ReqUpdateUserDto) {
    const user = await this.getUserId(reqUpdateUserDto.id);
    if (!user) throw new ApiException('没有找到该用户');

    const roles = await this.roleService.getRoleByIds(reqUpdateUserDto.roleIds);
    reqUpdateUserDto.roles = roles;
    console.log('user', reqUpdateUserDto);
    return await this.userRepository.save(reqUpdateUserDto);
  }

  //删除用户
  async delete(id: number) {
    await this.userRepository
      .createQueryBuilder('user')
      .delete()
      .from(User)
      .where('id=:id', { id })
      .execute();
  }

  //用户详情
  async getUserId(id: number) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where({ id })
      .getOne();
  }

  //获取用户列表
  async getList(reqUserListDto: ReqUserListDto) {
    const where: FindOptionsWhere<User> = {};
    if (reqUserListDto.user_name) {
      where.user_name = Like(`%${reqUserListDto.user_name}`);
    }
    if (reqUserListDto.phone) {
      where.phone = Like(`%${reqUserListDto.phone}`);
    }
    const { page = 1, limit = 10 } = reqUserListDto;

    const queryBuild = this.userRepository.createQueryBuilder('user');
    const reuslt = await queryBuild
      .where(where)
      .leftJoinAndSelect('user.roles', 'role')
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();
    return {
      rows: reuslt[0],
      total: reuslt[1],
    };
  }
}
