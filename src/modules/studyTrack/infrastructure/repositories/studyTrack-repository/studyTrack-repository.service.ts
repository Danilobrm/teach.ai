// modules/studyTrack/infrastructure/repositories/studyTrack-repository/studyTrack-repository.service.ts

import { Injectable } from '@nestjs/common';
import { StudyTrack } from '../../../domain/entities/studyTrack.entity';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../../../../common/errors/AppError';
import { IStudyTrackRepository } from '../../../domain/interfaces/studyTrack.repository.interface';

@Injectable()
export class StudyTrackRepositoryService implements IStudyTrackRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(studyTrack: StudyTrack): Promise<StudyTrack> {
    try {
      const createdStudyTrack = await this.prisma.studyTrack.create({
        data: {
          title: studyTrack.title,
          description: studyTrack.description ?? undefined, // Use `undefined` if description is `null`.
        },
      });
      return createdStudyTrack;
    } catch (error) {
      throw new AppError(error.meta.cause);
    }
  }

  async findById(id: string): Promise<StudyTrack | null> {
    return await this.prisma.studyTrack.findUnique({ where: { id } });
  }

  async findAll(): Promise<StudyTrack[]> {
    return await this.prisma.studyTrack.findMany();
  }

  async update(id: string, studyTrack: StudyTrack): Promise<StudyTrack> {
    try {
      const updatedStudyTrack = await this.prisma.studyTrack.update({
        where: { id },
        data: {
          title: studyTrack.title,
          description: studyTrack.description ?? undefined, // Handle null similarly.
        },
      });
      return updatedStudyTrack;
    } catch (error) {
      throw new AppError(error.meta.cause);
    }
  }

  async delete(id: string): Promise<void> {
    await this.prisma.studyTrack.delete({ where: { id } });
  }
}
