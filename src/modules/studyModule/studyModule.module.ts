import { MiddlewareConsumer, Module } from '@nestjs/common';
import { StudyModuleController } from './application/controllers/studyModule.controller';
import { StudyModuleService } from './application/services/studyModule.service';
import { StudyModuleRepositoryService } from './infrastructure/repositories/studyModule-repository/studyModule-repository.service';
import { PrismaClient } from '@prisma/client';
import { isAuthenticated } from 'src/common/middlewares/isAuthenticated';
import { JwtService } from '../auth/infrastructure/services/jwt.service';

@Module({
  controllers: [StudyModuleController],
  providers: [
    StudyModuleService,
    StudyModuleRepositoryService,
    PrismaClient,
    JwtService,
  ],
})
export class StudyModuleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes('studyModule');
  }
}
