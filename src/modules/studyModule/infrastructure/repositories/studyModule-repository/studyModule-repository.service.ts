import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { StudyModule } from '../../../domain/entities/studyModule.entity';
import { AppError } from '../../../../../common/errors/AppError';
import { IStudyModuleRepository } from '../../../domain/interfaces/studyModule.repository.interface';

@Injectable()
export class StudyModuleRepositoryService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(studyModule: StudyModule): Promise<StudyModule> {
    const createdStudyModule = await this.prisma.studyModule.create({
      data: {
        content: {
          create: {
            title: studyModule.content.title,
            description: studyModule.content.description,
          },
        },
        track: {
          connect: {
            id: studyModule.trackId,
          },
        },
      },
      include: {
        content: true,
        subjects: true,
      },
    });

    return createdStudyModule;
  }

  // async findById(id: string): Promise<StudyModule | null> {
  //   return await this.prisma.studyModule.findUnique({ where: { id } });
  // }

  async findByTrackId(trackId: string): Promise<StudyModule[]> {
    return await this.prisma.studyModule.findMany({
      where: { trackId: trackId },
      select: { id: true, content: true, trackId: true },
    });
  }

  // async findAll(): Promise<StudyModule[]> {
  //   return await this.prisma.studyModule.findMany({
  //     include: {
  //       content: true,
  //     },
  //   });
  // }

  // async update(id: string, studyModule: StudyModule): Promise<StudyModule> {
  //   try {
  //     const updatedStudyModule = await this.prisma.studyModule.update({
  //       where: { id },
  //       data: {
  //         title: studyModule.title,
  //         description: studyModule.description,
  //         trackId: studyModule.trackId,
  //       },
  //     });
  //     return updatedStudyModule;
  //   } catch (error) {
  //     throw new AppError(error.meta.cause);
  //   }
  // }

  // async delete(id: string): Promise<void> {
  //   await this.prisma.studyModule.delete({ where: { id } });
  // }
}
