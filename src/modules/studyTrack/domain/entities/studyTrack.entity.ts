// modules/studyTrack/domain/entities/studyTrack.entity.ts

export class StudyTrack {
  constructor(
    public title: string,
    public description: string | null = null, // Allow `null` values
  ) {}
}
