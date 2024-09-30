import { Quiz } from '../entities/quiz.entity';

export interface IQuizRepository {
  create(quizData: {
    question: string;
    correctAnswerIndex: number;
    options: string[];
    generatedContentId: string;
  }): Promise<Quiz>;

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
