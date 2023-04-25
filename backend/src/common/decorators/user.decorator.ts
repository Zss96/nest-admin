import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.User;
  return data ? user && user.user_id : user;
});
