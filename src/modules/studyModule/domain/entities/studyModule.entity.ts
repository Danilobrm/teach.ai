import { Content } from '@prisma/client';

export class StudyModule {
  constructor(
    public content: Content,
    public trackId: string,
  ) {}
}
