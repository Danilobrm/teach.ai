import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Subject } from '../../../domain/entities/subject.entity';

@Injectable()
export class SubjectRepositoryService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(subject: Subject): Promise<Subject> {
    const createdSubject = await this.prisma.subject.create({
      data: {
        moduleId: subject.moduleId,
        contentId: subject.contentId,
      },
      include: {
        content: true,
        module: true,
      },
    });

    return createdSubject;
  }

  async findByTrackId(trackId: string): Promise<Subject[]> {
    return await this.prisma.subject.findMany({
      where: {
        module: {
          trackId: trackId, // Assuming module is associated with a track
        },
      },
      include: {
        content: true,
        module: true, // Fetch module info
      },
    });
  }

  async findAll(): Promise<Subject[]> {
    return await this.prisma.subject.findMany({
      include: {
        content: true,
        module: true, // Fetch module info
      },
    });
  }

  // // Optional: Find subject by ID
  // async findById(id: string): Promise<Subject | null> {
  //   return await this.prisma.subject.findUnique({
  //     where: { id },
  //     include: {
  //       content: true,
  //       module: true,
  //     },
  //   });
  // }

  // // Optional: Update a subject
  // async update(id: string, subject: Partial<Subject>): Promise<Subject> {
  //   try {
  //     const updatedSubject = await this.prisma.subject.update({
  //       where: { id },
  //       data: {
  //         content: subject.contentId
  //           ? { connect: { id: subject.contentId } }
  //           : undefined,
  //         module: subject.moduleId
  //           ? { connect: { id: subject.moduleId } }
  //           : undefined,
  //       },
  //       include: {
  //         content: true,
  //         module: true,
  //       },
  //     });

  //     return updatedSubject;
  //   } catch (error) {
  //     throw new AppError(error.meta?.cause || 'Update failed');
  //   }
  // }

  // // Optional: Delete a subject
  // async delete(id: string): Promise<void> {
  //   await this.prisma.subject.delete({ where: { id } });
  // }
}
