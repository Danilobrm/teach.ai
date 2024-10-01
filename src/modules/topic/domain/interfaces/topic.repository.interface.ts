import { Topic } from '../entities/topic.entity'; // Adjust path as needed

export interface ITopicRepository {
  create(topic: Topic): Promise<Topic>;
  findById(id: string): Promise<Topic | null>;
  findAll(): Promise<Topic[]>;
  update(id: string, topic: Topic): Promise<Topic>;
  delete(id: string): Promise<void>;
}
