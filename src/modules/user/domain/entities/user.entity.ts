export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public studyTrackId: string,
    public role: string,
  ) {}
}
