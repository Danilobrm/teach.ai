import { Injectable } from '@nestjs/common';
import { PrismaClient, Quiz } from '@prisma/client';
import { AppError } from '../../../../../common/errors/AppError';
import { IQuizRepository } from '../../../domain/interfaces/quiz.repository.interface';
import { IQuiz } from '../../../domain/entities/quiz.entity';

@Injectable()
export class QuizRepositoryService implements IQuizRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(quizData: IQuiz[]): Promise<Quiz[]> {
    try {
      return await Promise.all(
        quizData.map(
          async (quiz) =>
            await this.prisma.quiz.create({
              data: {
                question: quiz.question,
                options: quiz.options,
                correctAnswerIndex: quiz.correctAnswerIndex,
                content: { connect: { id: quiz.contentId } },
              },
            }),
        ),
      );
    } catch (error) {
      throw new AppError(error);
    }
  }

  async findById(id: string): Promise<Quiz | null> {
    return await this.prisma.quiz.findUnique({
      where: { id },
      include: { content: true }, // Include related generated content
    });
  }

  async findAll(): Promise<Quiz[]> {
    return await this.prisma.quiz.findMany({});
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
