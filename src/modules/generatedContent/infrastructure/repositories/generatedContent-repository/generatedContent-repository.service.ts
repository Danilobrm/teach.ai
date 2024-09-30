import { Injectable } from '@nestjs/common';
import { GeneratedContent } from '../../../domain/entities/generatedContent.entity';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../../../../common/errors/AppError';
// import { IGeneratedContentRepository } from '../../../domain/interfaces/generatedContent.repository.interface';

// implements IGeneratedContentRepository
@Injectable()
export class GeneratedContentRepositoryService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(generatedContent: GeneratedContent): Promise<GeneratedContent> {
    try {
      const createdContent = await this.prisma.generatedContent.create({
        data: {
          title: generatedContent.title,
          description: generatedContent.description ?? undefined,
          content: generatedContent.content,
          moduleId: generatedContent.moduleId ?? undefined,
          trackId: generatedContent.trackId ?? undefined,
        },
      });
      return createdContent;
    } catch (error) {
      throw new AppError(error.meta.cause);
    }
  }

  //   async findById(id: string): Promise<GeneratedContent | null> {
  //     return await this.prisma.generatedContent.findUnique({ where: { id } });
  //   }

  //   async findAll(): Promise<GeneratedContent[]> {
  //     return await this.prisma.generatedContent.findMany();
  //   }

  //   async update(
  //     id: string,
  //     generatedContent: GeneratedContent,
  //   ): Promise<GeneratedContent> {
  //     try {
  //       const updatedContent = await this.prisma.generatedContent.update({
  //         where: { id },
  //         data: {
  //           title: generatedContent.title,
  //           description: generatedContent.description ?? undefined,
  //           content: generatedContent.content,
  //           moduleId: generatedContent.moduleId ?? undefined,
  //           trackId: generatedContent.trackId ?? undefined,
  //         },
  //       });
  //       return updatedContent;
  //     } catch (error) {
  //       throw new AppError(error.meta.cause);
  //     }
  //   }

  //   async delete(id: string): Promise<void> {
  //     await this.prisma.generatedContent.delete({ where: { id } });
  //   }
}
