import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getOrCreateUser(@Req() request: Request) {
    const magicHutSession = await this.authService.getMagicHutSession(request.headers.cookie!);

    let harborUser = await this.usersService.findUser(magicHutSession.user.id);

    if (!harborUser) {
      harborUser = await this.usersService.createUser(magicHutSession.user.id);
    }

    return {
      id: harborUser.id,
      magicHutId: harborUser.magicHutId,
      email: magicHutSession.user.email,
      name: magicHutSession.user.name,
      image: magicHutSession.user.image,
      createdAt: harborUser.createdAt,
      updatedAt: harborUser.updatedAt,
    };
  }
}
