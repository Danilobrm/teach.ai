import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { PrismaClient } from '@prisma/client';
import { AppError } from 'src/common/errors/AppError';

@Injectable()
export class UserRepositoryService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(user: User): Promise<User> {
    try {
      const createdUser = await this.prisma.user.create({
        data: {
          email: user.email,
          password: user.password,
        },
      });
      return createdUser;
    } catch (error) {
      throw new AppError(error.meta.cause);
    }
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
