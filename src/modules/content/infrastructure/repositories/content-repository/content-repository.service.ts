import { Injectable } from '@nestjs/common';
import { IContent } from '../../../domain/entities/content.entity';
import { Content, PrismaClient } from '@prisma/client';
import { AppError } from '../../../../../common/errors/AppError';
// import { IContentRepository } from '../../../domain/interfaces/content.repository.interface';

// implements IContentRepository
@Injectable()
export class ContentRepositoryService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(content: IContent): Promise<Content> {
    try {
      const createdContent = await this.prisma.content.create({
        data: {
          title: content.title,
          description: content.description || '',
          prompt: {
            create: {
              prompt: content.prompt || '',
            },
          },
        },
        include: {
          prompt: true,
        },
      });
      return createdContent;
    } catch (error) {
      throw new AppError(error);
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

  async findById(id: string): Promise<Content> {
    return await this.prisma.content.findUnique({
      where: { id },
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
