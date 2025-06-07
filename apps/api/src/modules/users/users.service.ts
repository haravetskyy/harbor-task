import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUser(magicHutId: string) {
    return await this.prisma.users.findUnique({
      where: { magicHutId },
    });
  }

  async createUser(magicHutId: string) {
    return await this.prisma.users.create({
      data: {
        magicHutId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
