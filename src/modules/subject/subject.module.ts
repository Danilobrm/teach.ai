import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SubjectController } from './application/controllers/subject.controller'; // Updated controller name
import { SubjectService } from './application/services/subject.service'; // Updated service name
import { SubjectRepositoryService } from './infrastructure/repositories/subject-repository/subject-repository.service';
import { PrismaClient } from '@prisma/client';
import { isAuthenticated } from 'src/common/middlewares/isAuthenticated';
import { JwtService } from '../auth/infrastructure/services/jwt.service';
import { ContentModule } from '../content/content.module';
import { UserService } from '../user/application/services/user.service';
import { UserRepositoryService } from '../user/infrastructure/repositories/user-repository/user-repository.service';

@Module({
  imports: [ContentModule],
  controllers: [SubjectController], // Updated controller name
  providers: [
    SubjectService, // Updated service name
    SubjectRepositoryService,
    PrismaClient,
    JwtService,
    UserService,
    UserRepositoryService,
  ],
})
export class SubjectModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes('subject'); // Updated route path
  }
}
