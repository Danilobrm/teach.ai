import { Injectable } from '@nestjs/common';
import { PrismaClient, StudyModule } from '@prisma/client';
import { IStudyModule } from '../../../domain/entities/studyModule.entity';
import { AppError } from '../../../../../common/errors/AppError';
import { IStudyModuleRepository } from '../../../domain/interfaces/studyModule.repository.interface';

@Injectable()
export class StudyModuleRepositoryService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(studyModule: IStudyModule): Promise<StudyModule> {
    const createdStudyModule = await this.prisma.studyModule.create({
      data: { contentId: studyModule.contentId, trackId: studyModule.trackId },
      include: {
        content: true,
        subjects: true,
      },
    });
    studyModule;
    return createdStudyModule;
  }

  // async findById(id: string): Promise<StudyModule | null> {
  //   return await this.prisma.studyModule.findUnique({ where: { id } });
  // }

  // async findByTrackId(trackId: string): Promise<StudyModule[]> {
  //   return await this.prisma.studyModule.findMany({
  //     where: { trackId: trackId },
  //     select: { id: true, content: true, trackId: true },
  //   });
  // }

  async findAll(): Promise<StudyModule[]> {
    return await this.prisma.studyModule.findMany({
      include: {
        content: true,
        subjects: true,
      },
    });
  }

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
