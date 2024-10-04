import { MiddlewareConsumer, Module } from '@nestjs/common';
import { StudyTrackController } from './application/controllers/studyTrack.controller';
import { StudyTrackService } from './application/services/studyTrack.service';
import { StudyTrackRepositoryService } from './infrastructure/repositories/studyTrack-repository/studyTrack-repository.service';
import { isAuthenticated } from '../../common/middlewares/isAuthenticated';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '../auth/infrastructure/services/jwt.service';
import { UserService } from '../user/application/services/user.service';
import { UserRepositoryService } from '../user/infrastructure/repositories/user-repository/user-repository.service';

@Module({
  controllers: [StudyTrackController, StudyTrackController], // Add StudyTrackController if it exists
  providers: [
    PrismaClient,
    StudyTrackService,
    StudyTrackRepositoryService,
    JwtService,
    UserService,
    UserRepositoryService
  ],
  exports: [StudyTrackRepositoryService],
})
export class StudyTrackModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(isAuthenticated).forRoutes('studyTrack');
  }
}
