import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../../../../common/errors/AppError';
import { IQuizRepository } from '../../../domain/interfaces/quiz.repository.interface';
import { Quiz } from '../../../domain/entities/quiz.entity';

@Injectable()
export class QuizRepositoryService implements IQuizRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(quizData: {
    question: string;
    correctAnswerIndex: number;
    options: string[];
    generatedContentId: string;
  }): Promise<Quiz> {
    try {
      const createdQuiz = await this.prisma.quiz.create({
        data: quizData,
      });
      return createdQuiz;
    } catch (error) {
      throw new AppError(error);
    }
  }

  async findById(id: string): Promise<Quiz | null> {
    return await this.prisma.quiz.findUnique({
      where: { id },
      include: { generatedContent: true }, // Include related generated content
    });
  }

  async findAll(): Promise<Quiz[]> {
    return await this.prisma.quiz.findMany({
      include: { generatedContent: true },
    });
  }

  async update(
    id: string,
    quizData: {
      question?: string;
      correctAnswerIndex?: number;
      options?: string[];
    },
  ): Promise<Quiz> {
    try {
      return await this.prisma.quiz.update({
        where: { id },
        data: quizData,
      });
    } catch (error) {
      throw new AppError(error);
    }
  }

  async delete(id: string): Promise<void> {
    await this.prisma.quiz.delete({ where: { id } });
  }
}
