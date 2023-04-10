import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from 'src/common/utils/crypto.util';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { ReqAddUserDto, ReqUserListDto } from './dto/req-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  getUserForName(user_name: string) {
    const user = this.userRepository.find({
      select: ['user_id', 'user_name', 'password', 'salt'],
      where: {
        user_name,
      },
    });
    return user;
  }

  async addUser(reqAddUserDto: ReqAddUserDto) {
    const salt = makeSalt();
    reqAddUserDto.password = encryptPassword(reqAddUserDto.password, salt);
    reqAddUserDto.salt = salt;
    try {
      return await this.userRepository.save(reqAddUserDto);
    } catch (error) {
      console.log(error);
    }
    // return 'xxx';

    // return reqAddUserDto;
  }

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
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();
    return reuslt;
  }
}
