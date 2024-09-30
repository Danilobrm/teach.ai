import { StudyTrack } from '../../domain/entities/studyTrack.entity';

export interface IStudyTrackRepository {
  create(studyTrack: StudyTrack): Promise<StudyTrack>;
  findById(id: string): Promise<StudyTrack | null>;
  findAll(): Promise<StudyTrack[]>;
  update(id: string, studyTrack: StudyTrack): Promise<StudyTrack>;
  delete(id: string): Promise<void>;
}
