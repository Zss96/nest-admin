import { HttpException } from '@nestjs/common';
export class ApiException extends HttpException {
  private code: number;
  constructor(msg: string, code?: number) {
    if (code && code === 401) {
      super(msg, 200);
      this.code = 401;
    } else {
      super(msg, code ?? 200);
      this.code = code ?? 500;
    }
  }
  getCode(): number {
    return this.code;
  }
}
