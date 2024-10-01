import { Subject } from '../entities/subject.entity';

export interface ISubjectRepository {
  create(subject: Subject): Promise<Subject>;
  findById(id: string): Promise<Subject | null>;
  findAll(): Promise<Subject[]>;
  update(id: string, subject: Subject): Promise<Subject>;
  delete(id: string): Promise<void>;
}
