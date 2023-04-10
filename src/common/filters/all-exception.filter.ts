import { ApiException } from 'src/common/exceptions/api.exception';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { response } from 'express';
import { AjaxResult } from '../class/ajax-result.class';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { status, result } = this.errorResult(exception);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.status(status).json(result);
  }
  errorResult(exception: any) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const code =
      exception instanceof ApiException ? exception.getCode() : status;
    let message: string;
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      message = (response as any).message ?? response;
    } else {
      message = `${exception}`;
    }
    return {
      status,
      result: AjaxResult.error(message, code),
    };
  }
}
