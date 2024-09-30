import { Injectable } from '@nestjs/common';
import { GeneratedContent } from '../../domain/entities/generatedContent.entity';
import { GeneratedContentRepositoryService } from '../../infrastructure/repositories/generatedContent-repository/generatedContent-repository.service';

@Injectable()
export class GeneratedContentService {
  constructor(
    private readonly generatedContentRepository: GeneratedContentRepositoryService,
  ) {}

  async createGeneratedContent(data: {
    title: string;
    description?: string;
    content: string;
    moduleId?: string;
    trackId?: string;
  }): Promise<GeneratedContent> {
    return this.generatedContentRepository.create({
      title: data.title,
      description: data.description,
      content: data.content,
      moduleId: data.moduleId,
      trackId: data.trackId,
    });
  }

  async findByTrackId(trackId: string): Promise<GeneratedContent[]> {
    return this.generatedContentRepository.findByTrackId(trackId);
  }

  async findByModuleId(moduleId: string): Promise<GeneratedContent[]> {
    return this.generatedContentRepository.findByModuleId(moduleId);
  }

  async findAll(): Promise<GeneratedContent[]> {
    return this.generatedContentRepository.findAll();
  }

  async delete(id: string): Promise<void> {
    this.generatedContentRepository.delete(id);
  }
}
