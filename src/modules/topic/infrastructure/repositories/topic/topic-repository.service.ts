import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../../../../common/errors/AppError';
import { Content } from 'src/modules/content/domain/entities/content.entity';

@Injectable()
export class TopicRepositoryService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(topic: { content: Content; subjectId: string }) {
    const createdTopic = await this.prisma.topic.create({
      data: {
        content: {
          create: {
            title: topic.content.title,
            description: topic.content.description,
          },
        },
        subject: {
          connect: {
            id: topic.subjectId,
          },
        },
      },
    });

    return createdTopic;
  }

  // async findById(id: string): Promise<Topic | null> {
  //   return await this.prisma.topic.findUnique({
  //     where: { id },
  //   });
  // }

  // async findBySubjectId(subjectId: string): Promise<Topic[]> {
  //   return await this.prisma.topic.findMany({
  //     where: { subjectId },
  //   });
  // }

  async findAll() {
    return await this.prisma.topic.findMany({
      include: {
        content: true, // Include content details if needed
        subject: true, // Include subject details if needed
      },
    });
  }

  // async update(
  //   id: string,
  //   topic: { contentId: string; subjectId: string },
  // ): Promise<Topic> {
  //   try {
  //     const updatedTopic = await this.prisma.topic.update({
  //       where: { id },
  //       data: {
  //         contentId: topic.contentId,
  //         subjectId: topic.subjectId,
  //       },
  //     });
  //     return updatedTopic;
  //   } catch (error) {
  //     throw new AppError(error.meta?.cause || 'Error updating topic');
  //   }
  // }

  // async delete(id: string): Promise<void> {
  //   await this.prisma.topic.delete({
  //     where: { id },
  //   });
  // }
}
