import { StudyModule } from '../entities/studyModule.entity';

export interface IStudyModuleRepository {
  create(studyModule: StudyModule): Promise<StudyModule>;
  findById(id: string): Promise<StudyModule | null>;
  findAll(): Promise<StudyModule[]>;
  update(id: string, studyModule: StudyModule): Promise<StudyModule>;
  delete(id: string): Promise<void>;
}
