export class StudyPlan {
  constructor(
    public userId: string,
    public moduleId: string,
    public studyTime: number,
    public day: number,
  ) {}
}
