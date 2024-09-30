import { StudyPlan } from '../entities/studyPlan.entity';

export interface IStudyPlanRepository {
  create(studyPlan: StudyPlan): Promise<StudyPlan>;
  findById(id: string): Promise<StudyPlan | null>;
  findAll(): Promise<StudyPlan[]>;
  update(id: string, studyPlan: StudyPlan): Promise<StudyPlan>;
  delete(id: string): Promise<void>;
  findStudyPlansByUserId(userId: string): Promise<StudyPlan[]>;
}
