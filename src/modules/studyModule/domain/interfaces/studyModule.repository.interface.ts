import { StudyModule } from '@prisma/client';
import { IStudyModule } from '../entities/studyModule.entity';

export interface IStudyModuleRepository {
  create(studyModule: IStudyModule): Promise<StudyModule>;
  findById(id: string): Promise<StudyModule | null>;
  findAll(): Promise<StudyModule[]>;
  update(id: string, studyModule: StudyModule): Promise<StudyModule>;
  delete(id: string): Promise<void>;
}
