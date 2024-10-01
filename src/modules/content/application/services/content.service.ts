import { Injectable } from '@nestjs/common';
import { Content } from '../../domain/entities/content.entity';
import { ContentRepositoryService } from '../../infrastructure/repositories/content-repository/content-repository.service';

@Injectable()
export class ContentService {
  constructor(private readonly contentRepository: ContentRepositoryService) {}

  async createContent(content: Content): Promise<Content> {
    return new Content(content.title, content.description);
  }

  // async findByTrackId(trackId: string): Promise<Content[]> {
  //   return this.contentRepository.findByTrackId(trackId);
  // }

  // async findByModuleId(moduleId: string): Promise<Content[]> {
  //   return this.contentRepository.findByModuleId(moduleId);
  // }

  async findAll(): Promise<Content[]> {
    return this.contentRepository.findAll();
  }

  async delete(id: string): Promise<void> {
    this.contentRepository.delete(id);
  }
}
