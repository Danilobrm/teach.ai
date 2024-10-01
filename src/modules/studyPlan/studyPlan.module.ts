import { MiddlewareConsumer, Module } from '@nestjs/common';
import { StudyPlanController } from './application/controllers/studyPlan.controller';
import { StudyPlanService } from './application/services/studyPlan.service';
import { StudyPlanRepositoryService } from './infrastructure/repositories/studyPlan-repository/studyPlan-repository.service';
import { PrismaClient } from '@prisma/client';
import { isAuthenticated } from 'src/common/middlewares/isAuthenticated';
import { JwtService } from '../auth/infrastructure/services/jwt.service';
import { UserService } from '../user/application/services/user.service';
import { UserRepositoryService } from '../user/infrastructure/repositories/user-repository/user-repository.service';

@Module({
  controllers: [StudyPlanController],
  providers: [
    StudyPlanService,
    StudyPlanRepositoryService,
    PrismaClient,
    JwtService,
    UserService,
    UserRepositoryService
  ],
})
export class StudyPlanModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes('studyPlan');
  }
}
