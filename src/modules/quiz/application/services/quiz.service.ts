import { Injectable } from '@nestjs/common';
import { IQuiz } from '../../domain/entities/quiz.entity';
import { QuizRepositoryService } from '../../infrastructure/repositories/quiz-repository/quiz-repository.service';

@Injectable()
export class QuizService {
  constructor(private readonly quizRepo: QuizRepositoryService) {}

  async create(quizData: IQuiz[]) {
    return this.quizRepo.create(quizData);
  }

  async findById(id: string) {
    return this.quizRepo.findById(id);
  }

  async findAll() {
    return this.quizRepo.findAll();
  }

  async update(
    id: string,
    quizData: {
      question?: string;
      correctAnswerIndex?: number;
      options?: string[];
    },
  ) {
    return this.quizRepo.update(id, quizData);
  }

  async delete(id: string) {
    return this.quizRepo.delete(id);
  }
}
