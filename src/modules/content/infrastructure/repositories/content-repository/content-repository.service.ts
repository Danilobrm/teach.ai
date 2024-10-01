import { Injectable } from '@nestjs/common';
import { Content } from '../../../domain/entities/content.entity';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../../../../common/errors/AppError';
// import { IContentRepository } from '../../../domain/interfaces/content.repository.interface';

// implements IContentRepository
@Injectable()
export class ContentRepositoryService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(content: Content): Promise<Content> {
    try {
      const createdContent = await this.prisma.content.create({
        data: {
          title: content.title,
          description: content.description,
        },
      });
      return createdContent;
    } catch (error) {
      throw new AppError(error.meta.cause);
    }
  }

  //   async findById(id: string): Promise<Content | null> {
  //     return await this.prisma.content.findUnique({ where: { id } });
  //   }

  async findAll(): Promise<Content[]> {
    return await this.prisma.content.findMany({
      include: {
        quizzes: true,
      },
    });
  }

  // async findByModuleId(moduleId: string): Promise<Content[]> {
  //   return await this.prisma.content.findMany({
  //     where: { moduleId },
  //     include: {
  //       quizzes: true,
  //     },
  //   });
  // }

  // async findByTrackId(trackId: string): Promise<Content[]> {
  //   return await this.prisma.content.findMany({
  //     where: { trackId },
  //     include: {
  //       quizzes: true,
  //     },
  //   });
  // }

  //   async update(
  //     id: string,
  //     content: Content,
  //   ): Promise<Content> {
  //     try {
  //       const updatedContent = await this.prisma.content.update({
  //         where: { id },
  //         data: {
  //           title: content.title,
  //           description: content.description ?? undefined,
  //           content: content.content,
  //           moduleId: content.moduleId ?? undefined,
  //           trackId: content.trackId ?? undefined,
  //         },
  //       });
  //       return updatedContent;
  //     } catch (error) {
  //       throw new AppError(error.meta.cause);
  //     }
  //   }

  async delete(id: string): Promise<void> {
    await this.prisma.content.delete({ where: { id } });
  }
}
