import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Session } from './session.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('session')
  async getSession(@Req() request: Request): Promise<Session> {
    return this.authService.getMagicHutSession(request.headers.cookie!);
  }
}
