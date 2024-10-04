import { IContent } from '../entities/content.entity';

export interface IContentRepository {
  create(content: IContent): Promise<IContent>;
  findById(id: string): Promise<IContent | null>;
  findAll(): Promise<IContent[]>;
  update(id: string, content: IContent): Promise<IContent>;
  delete(id: string): Promise<void>;
}
