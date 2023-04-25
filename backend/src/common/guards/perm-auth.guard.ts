import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PERMISSION_KEY_METADATA } from '../constant/decorator.constant';
import { Permis } from '../decorators/req-perm.decorator';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { USER_PERMISSIONS_KEY } from '../constant/redis.constant';
import { LogicalEnum } from '../emums/logical.enum';
import { ApiException } from '../exceptions/api.exception';

export class PermAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async canActivate(context: ExecutionContext) {
    const perms = this.reflector.getAllAndOverride<Permis>(
      PERMISSION_KEY_METADATA,
      [context.getHandler, context.getClass()],
    );

    if (!perms || !perms.permArr.length) return true;
    const request = context.switchToHttp().getRequest();
    const user_id = request.user?.user_id;
    const userPerms = JSON.parse(
      await this.redis.get(`${USER_PERMISSIONS_KEY}:${user_id}`),
    );
    if (userPerms.includes('*:*:*')) return true;
    let result = false;
    if (perms.logical === LogicalEnum.or) {
      result = perms.permArr.some((item) => {
        return userPerms.includes(item);
      });
    } else if (perms.logical === LogicalEnum.and) {
      result = perms.permArr.every((item) => {
        return userPerms.includes(item);
      });
    }
    if (!result) throw new ApiException('暂无权限访问，请联系管理员');
    return result;
  }
}
