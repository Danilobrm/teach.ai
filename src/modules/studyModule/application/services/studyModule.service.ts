import { Injectable } from '@nestjs/common';
import { StudyModule } from '../../domain/entities/studyModule.entity';
import { StudyModuleRepositoryService } from '../../infrastructure/repositories/studyModule-repository/studyModule-repository.service';

@Injectable()
export class StudyModuleService {
  constructor(private readonly studyModuleRepo: StudyModuleRepositoryService) {}

  async create(studyModule: StudyModule): Promise<StudyModule> {
    return this.studyModuleRepo.create(studyModule);
  }

  async findById(id: string): Promise<StudyModule | null> {
    return this.studyModuleRepo.findById(id);
  }

  async findAll(): Promise<StudyModule[]> {
    return this.studyModuleRepo.findAll();
  }

  async update(id: string, studyModule: StudyModule): Promise<StudyModule> {
    return this.studyModuleRepo.update(id, studyModule);
  }

  async delete(id: string): Promise<void> {
    return this.studyModuleRepo.delete(id);
  }
}
