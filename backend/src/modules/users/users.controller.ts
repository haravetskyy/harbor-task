import { Controller, Get, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getSeededUser() {
    const user = await this.usersService.findFirst();
    if (!user) {
      throw new NotFoundException('No user found');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
    };
  }
}
