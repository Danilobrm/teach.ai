import { Content } from '@prisma/client';

export class Subject {
  constructor(
    public content: Content,
    public moduleId?: string,
  ) {}
}
