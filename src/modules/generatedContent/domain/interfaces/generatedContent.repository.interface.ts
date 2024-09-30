import { GeneratedContent } from '../entities/generatedContent.entity';

export interface IGeneratedContentRepository {
  create(generatedContent: GeneratedContent): Promise<GeneratedContent>;
  findById(id: string): Promise<GeneratedContent | null>;
  findAll(): Promise<GeneratedContent[]>;
  update(
    id: string,
    generatedContent: GeneratedContent,
  ): Promise<GeneratedContent>;
  delete(id: string): Promise<void>;
}
