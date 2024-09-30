import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { StudyPlan } from '../../../domain/entities/studyPlan.entity'; // Adjusted import for StudyPlan
import { AppError } from '../../../../../common/errors/AppError';
import { IStudyPlanRepository } from '../../../domain/interfaces/studyPlan.repository.interface'; // Adjust the interface name

@Injectable()
export class StudyPlanRepositoryService implements IStudyPlanRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(studyPlan: StudyPlan): Promise<StudyPlan> {
    try {
      const createdStudyPlan = await this.prisma.studyPlan.create({
        data: {
          userId: studyPlan.userId,
          moduleId: studyPlan.moduleId,
          studyTime: studyPlan.studyTime,
          day: studyPlan.day,
        },
      });
      return createdStudyPlan;
    } catch (error) {
      throw new AppError(error);
    }
  }

  async findById(id: string): Promise<StudyPlan | null> {
    return await this.prisma.studyPlan.findUnique({ where: { id } });
  }

  async findAll(): Promise<StudyPlan[]> {
    return await this.prisma.studyPlan.findMany();
  }

  async update(id: string, studyPlan: StudyPlan): Promise<StudyPlan> {
    try {
      const updatedStudyPlan = await this.prisma.studyPlan.update({
        where: { id },
        data: {
          userId: studyPlan.userId,
          moduleId: studyPlan.moduleId,
          studyTime: studyPlan.studyTime,
          day: studyPlan.day,
        },
      });
      return updatedStudyPlan;
    } catch (error) {
      throw new AppError(error.meta.cause);
    }
  }

  async delete(id: string): Promise<void> {
    await this.prisma.studyPlan.delete({ where: { id } });
  }

  async findStudyPlansByUserId(userId: string): Promise<StudyPlan[]> {
    return await this.prisma.studyPlan.findMany({
      where: {
        userId,
      },
    });
  }
}
