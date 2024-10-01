import { Content } from '../entities/content.entity';

export interface IContentRepository {
  create(content: Content): Promise<Content>;
  findById(id: string): Promise<Content | null>;
  findAll(): Promise<Content[]>;
  update(id: string, content: Content): Promise<Content>;
  delete(id: string): Promise<void>;
}
