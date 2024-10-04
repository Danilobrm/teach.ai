import { Injectable } from '@nestjs/common';
import { PrismaClient, StudyPlanPerDay } from '@prisma/client';
import { IStudyPlanPerDay } from '../../../domain/entities/studyPlan.entity'; // Adjusted import for StudyPlan
import { AppError } from '../../../../../common/errors/AppError';
import { IStudyPlanRepository } from '../../../domain/interfaces/studyPlan.repository.interface'; // Adjust the interface name

@Injectable()
export class StudyPlanRepositoryService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(studyPlanPerDay: IStudyPlanPerDay[]) {
    // try {
    //   const createdStudyPlan =
    //     await this.prisma.studyPlanPerDay.createManyAndReturn({
    //       data: {},
    //     });
    //   return createdStudyPlan;
    // } catch (error) {
    //   throw new AppError(error);
    // }
    // return studyPlanPerDay;
  }

  // async findById(id: string): Promise<StudyPlan | null> {
  //   return await this.prisma.studyPlan.findUnique({ where: { id } });
  // }

  // async findAll(): Promise<StudyPlan[]> {
  //   return await this.prisma.studyPlan.findMany();
  // }

  // async update(id: string, studyPlan: StudyPlan): Promise<StudyPlan> {
  //   try {
  //     const updatedStudyPlan = await this.prisma.studyPlan.update({
  //       where: { id },
  //       data: {
  //         userId: studyPlan.userId,
  //         moduleId: studyPlan.moduleId,
  //         studyTime: studyPlan.studyTime,
  //         day: studyPlan.day,
  //       },
  //     });
  //     return updatedStudyPlan;
  //   } catch (error) {
  //     throw new AppError(error.meta.cause);
  //   }
  // }

  // async delete(id: string): Promise<void> {
  //   await this.prisma.studyPlan.delete({ where: { id } });
  // }

  // async findStudyPlansByUserId(userId: string): Promise<StudyPlan[]> {
  //   return await this.prisma.studyPlan.findMany({
  //     where: {
  //       userId,
  //     },
  //   });
  // }
}
