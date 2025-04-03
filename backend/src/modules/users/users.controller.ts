import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';

export type Session = {
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  };
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
  };
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getOrCreateUser(@Req() request: Request) {
    const magicHutResponse = await fetch(`${process.env.MAGIC_HUT_URL}/api/auth/session`, {
      method: 'GET',
      headers: {
        Cookie: request.headers.cookie!,
      },
    });

    if (!magicHutResponse.ok) {
      throw new Error(
        `Failed to fetch user data from Magic Hut. Status code: ${magicHutResponse.status}`,
      );
    }

    const magicHutSession: { session: Session } = await magicHutResponse.json();

    const harborUser = await this.usersService.findOrCreateUser(magicHutSession.session.user.id);

    return {
      id: harborUser.id,
      magicHutId: harborUser.magicHutId,
      email: magicHutSession.session.user.email,
      name: magicHutSession.session.user.name,
      image: magicHutSession.session.user.image,
      createdAt: harborUser.createdAt,
      updatedAt: harborUser.updatedAt,
    };
  }
}
