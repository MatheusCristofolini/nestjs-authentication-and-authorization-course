import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { promisify } from 'util';
import { ActiveUser } from '../decorators/active-user.decorator';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { Auth } from './decorators/auth.decorator';
import { SingInDto } from './dto/sing-in.dto';
import { AuthType } from './enums/auth-type.enum';
import { SessionGuard } from './guards/session.guard';
import { SessionAuthenticationService } from './session-authentication.service';

@Auth(AuthType.None)
@Controller('session-authentication')
export class SessionAuthenticationController {
  constructor(
    private readonly sessionAuthService: SessionAuthenticationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('sing-in')
  async singIn(@Req() request: Request, @Body() singInDto: SingInDto) {
    const user = await this.sessionAuthService.singIn(singInDto);
    await promisify(request.logIn).call(request, user);
  }

  @UseGuards(SessionGuard)
  @Get()
  async sayHello(@ActiveUser() user: ActiveUserData) {
    return `Hello, ${user.email}!`;
  }
}
