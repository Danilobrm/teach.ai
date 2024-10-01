import { Injectable } from '@nestjs/common';
import { SubjectRepositoryService } from '../../infrastructure/repositories/subject-repository/subject-repository.service';
import { Subject } from '../../domain/entities/subject.entity';

@Injectable()
export class SubjectService {
  constructor(private readonly subjectRepo: SubjectRepositoryService) {}

  // Create a subject, including handling content and module associations
  async create(subject: Subject): Promise<Subject> {
    return this.subjectRepo.create(subject);
  }

  // Find subjects by track ID
  async findByTrackId(id: string): Promise<Subject[]> {
    return this.subjectRepo.findByTrackId(id);
  }

  // Find all subjects
  async findAll(): Promise<Subject[]> {
    return this.subjectRepo.findAll();
  }

  // // Update a subject by ID
  // async update(
  //   id: string,
  //   subject: {
  //     contentId: string;
  //     moduleId?: string;
  //     topics: any[]; // Replace 'any[]' with the correct type for topics
  //   },
  // ): Promise<Subject> {
  //   return this.subjectRepo.update(id, subject);
  // }

  // // Delete a subject by ID
  // async delete(id: string): Promise<void> {
  //   return this.subjectRepo.delete(id);
  // }
}
