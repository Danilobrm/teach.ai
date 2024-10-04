export class StudyPlan {
  constructor(
    public userId: string,
    public moduleId: string,
    public studyTime: number,
    public day: number,
  ) {}
}
export class IStudyPlanPerDay {
  constructor(
    public userId: string,
    public studyPlan: StudyPlan[],
  ) {}
}
