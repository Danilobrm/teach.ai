import { MiddlewareConsumer, Module } from '@nestjs/common';
import { QuizController } from './application/controllers/quiz.controller';
import { QuizService } from './application/services/quiz.service';
import { QuizRepositoryService } from './infrastructure/repositories/quiz-repository/quiz-repository.service';
import { PrismaClient } from '@prisma/client';
import { isAuthenticated } from 'src/common/middlewares/isAuthenticated';
import { JwtService } from '../auth/infrastructure/services/jwt.service';

@Module({
  controllers: [QuizController],
  providers: [QuizService, QuizRepositoryService, PrismaClient, JwtService],
})
export class QuizModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes('quiz'); // Change the route to 'quiz'
  }
}
