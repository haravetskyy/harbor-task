import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateUser(email: string, name: string, image?: string | null) {
    let user = await this.prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      user = await this.prisma.users.create({
        data: {
          email,
          name,
          emailVerified: true,
          image: image || null || undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } else {
      user = await this.prisma.users.update({
        where: { email },
        data: {
          name,
          image: image || null || undefined,
          updatedAt: new Date(),
        },
      });
    }

    return user;
  }
}
