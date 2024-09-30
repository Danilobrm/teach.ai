import { Injectable } from '@nestjs/common';
import { StudyTrack } from '../../domain/entities/studyTrack.entity';
import { StudyTrackRepositoryService } from '../../infrastructure/repositories/studyTrack-repository/studyTrack-repository.service';

@Injectable()
export class StudyTrackService {
  constructor(
    private readonly studyTrackRepository: StudyTrackRepositoryService,
  ) {}

  async createStudyTrack(
    title: string,
    description?: string,
  ): Promise<StudyTrack> {
    const studyTrack = new StudyTrack(title, description);
    return this.studyTrackRepository.create(studyTrack);
  }

  async findAllStudyTracks(): Promise<StudyTrack[]> {
    return this.studyTrackRepository.findAll();
  }
}
