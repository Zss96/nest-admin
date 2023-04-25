import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { ReqLoginDto } from './dto/req-login.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('登录')
@Controller()
@ApiBasicAuth()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Get('captchaImage')
  async captchaImage() {
    return await this.loginService.createImgCaptcha();
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Body() reqLoginDto: ReqLoginDto, @Request() req: Request) {
    return await this.loginService.login(req);
  }

  @Get('userInfo')
  async getInfo(@User('id') id: number) {
    return await this.loginService.getInfo(id);
  }
}
