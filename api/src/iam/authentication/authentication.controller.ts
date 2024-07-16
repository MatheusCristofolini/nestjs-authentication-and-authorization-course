import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SingInDto } from './dto/sing-in.dto';
import { SingUpDto } from './dto/sing-up.dto';
import { AuthType } from './enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sing-up')
  singUp(@Body() singUpDto: SingUpDto) {
    return this.authService.singUp(singUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sing-in')
  async singIn(
    @Res({ passthrough: true }) response: Response,
    @Body() singInDto: SingInDto,
  ) {
    const acessToken = await this.authService.singIn(singInDto);
    response.cookie('accessToken', acessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
    return this.authService.singIn(singInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }

  /*
  @HttpCode(HttpStatus.OK)
  @Post('sing-in')
  async singIn(
    @Res({ passthrough: true }) response: Response,
    @Body() singInDto: SingInDto,
  ) {
    const acessToken = await this.authService.singIn(singInDto);
    response.cookie('accessToken', acessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
    return this.authService.singIn(singInDto);
  }
  */
}
