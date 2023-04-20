import { Observable } from 'rxjs';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  context: ExecutionContext;
  constructor() {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.context = context;
    return super.canActivate(context);
  }

  // handleRequest(err: any, user: any, info: any) {
  //   console.log('user11', user);
  //   if (err || !user) {
  //     const request = this.context.switchToHttp().getRequest();
  //     request.user = user;
  //     // this.logService.addLogininfor(request, err.response);
  //     throw err || new ApiException(err);
  //   }
  //   return user;
  // }
}
