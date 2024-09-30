import { Injectable } from '@nestjs/common';
import { StudyPlan } from '../../domain/entities/studyPlan.entity';
import { StudyPlanRepositoryService } from '../../infrastructure/repositories/studyPlan-repository/studyPlan-repository.service';

@Injectable()
export class StudyPlanService {
  constructor(private readonly studyPlanRepo: StudyPlanRepositoryService) {}

  async create(studyPlan: StudyPlan): Promise<StudyPlan> {
    return this.studyPlanRepo.create(studyPlan); // Directly passing the studyPlan object
  }

  async findById(id: string): Promise<StudyPlan | null> {
    return this.studyPlanRepo.findById(id); // Call findById method
  }

  async findAll(): Promise<StudyPlan[]> {
    return this.studyPlanRepo.findAll(); // Call findAll method
  }

  async update(id: string, studyPlan: StudyPlan): Promise<StudyPlan> {
    return this.studyPlanRepo.update(id, studyPlan); // Call update method with id and studyPlan
  }

  async delete(id: string): Promise<void> {
    return this.studyPlanRepo.delete(id); // Call delete method with id
  }

  async findStudyPlansByUserId(userId: string) {
    return this.studyPlanRepo.findStudyPlansByUserId(userId);
  }
}
