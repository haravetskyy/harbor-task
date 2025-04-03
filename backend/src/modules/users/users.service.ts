import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateUser(magicHutId: string) {
    let user = await this.prisma.users.findUnique({
      where: { magicHutId },
    });

    if (!user) {
      user = await this.prisma.users.create({
        data: {
          magicHutId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    return user;
  }
}
