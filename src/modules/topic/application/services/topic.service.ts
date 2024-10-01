import { Injectable } from '@nestjs/common';
import { TopicRepositoryService } from '../../infrastructure/repositories/topic/topic-repository.service';
import { Topic } from '../../domain/entities/topic.entity';
import { Content } from 'src/modules/content/domain/entities/content.entity';

@Injectable()
export class TopicService {
  constructor(private readonly topicRepo: TopicRepositoryService) {}

  // Create a new topic, linking content and subject
  async create(topic: { content: Content; subjectId: string }) {
    return this.topicRepo.create(topic);
  }

  // // Find all topics by a given subject ID
  // async findBySubjectId(subjectId: string): Promise<Topic[]> {
  //   return this.topicRepo.findBySubjectId(subjectId);
  // }

  // // Find a single topic by ID
  // async findById(id: string): Promise<Topic | null> {
  //   return this.topicRepo.findById(id);
  // }

  // Find all topics
  async findAll(): Promise<Topic[]> {
    return this.topicRepo.findAll();
  }

  // // Update a topic by ID
  // async update(
  //   id: string,
  //   topic: { contentId: string; subjectId: string },
  // ): Promise<Topic> {
  //   return this.topicRepo.update(id, topic);
  // }

  // // Delete a topic by ID
  // async delete(id: string): Promise<void> {
  //   return this.topicRepo.delete(id);
  // }
}
