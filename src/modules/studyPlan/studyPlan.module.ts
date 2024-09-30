import { MiddlewareConsumer, Module } from '@nestjs/common';
import { StudyPlanController } from './application/controllers/studyPlan.controller';
import { StudyPlanService } from './application/services/studyPlan.service';
import { StudyPlanRepositoryService } from './infrastructure/repositories/studyPlan-repository/studyPlan-repository.service';
import { PrismaClient } from '@prisma/client';
import { isAuthenticated } from 'src/common/middlewares/isAuthenticated';
import { JwtService } from '../auth/infrastructure/services/jwt.service';

@Module({
  controllers: [StudyPlanController],
  providers: [
    StudyPlanService,
    StudyPlanRepositoryService,
    PrismaClient,
    JwtService,
  ],
})
export class StudyPlanModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes('studyPlan');
  }
}
