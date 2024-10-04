import { Quiz } from '@prisma/client';
import { IQuiz } from '../entities/quiz.entity';

export interface IQuizRepository {
  create(quizData: IQuiz[]): Promise<Quiz[]>;

  findById(id: string): Promise<Quiz | null>;

  findAll(): Promise<Quiz[]>;

  update(
    id: string,
    quizData: {
      question?: string;
      correctAnswerIndex?: number;
      options?: string[];
    },
  ): Promise<Quiz>;
  delete(id: string): Promise<void>;
}
