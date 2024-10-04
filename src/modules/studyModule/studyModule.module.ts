import { MiddlewareConsumer, Module } from '@nestjs/common';
import { StudyModuleController } from './application/controllers/studyModule.controller';
import { StudyModuleService } from './application/services/studyModule.service';
import { StudyModuleRepositoryService } from './infrastructure/repositories/studyModule-repository/studyModule-repository.service';
import { PrismaClient } from '@prisma/client';
import { isAuthenticated } from 'src/common/middlewares/isAuthenticated';
import { JwtService } from '../auth/infrastructure/services/jwt.service';
import { ContentModule } from '../content/content.module';
import { UserService } from '../user/application/services/user.service';
import { UserRepositoryService } from '../user/infrastructure/repositories/user-repository/user-repository.service';

@Module({
  imports: [ContentModule],
  controllers: [StudyModuleController],
  providers: [
    StudyModuleService,
    StudyModuleRepositoryService,
    PrismaClient,
    JwtService,
    UserService,
    UserRepositoryService
  ],
})
export class StudyModuleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes('studyModule');
  }
}
