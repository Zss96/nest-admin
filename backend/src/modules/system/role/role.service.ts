import { Injectable } from '@nestjs/common';
import { ReqAddRoleDto } from './dto/req-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async addRole(reqAddRoleDto: ReqAddRoleDto) {
    return await this.roleRepository.save(reqAddRoleDto);
  }
  async getList() {
  
  }
  async getRoleByIds(ids: number[]) {
    return this.roleRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
