import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TopicController } from './application/controllers/topic.controller';
import { TopicService } from './application/services/topic.service'; // Change to TopicService
import { TopicRepositoryService } from './infrastructure/repositories/topic/topic-repository.service';
import { PrismaClient } from '@prisma/client';
import { isAuthenticated } from 'src/common/middlewares/isAuthenticated';
import { JwtService } from '../auth/infrastructure/services/jwt.service';
import { ContentModule } from '../content/content.module';
import { ContentController } from '../content/application/controllers/content.controller';
import { UserService } from '../user/application/services/user.service';
import { UserRepositoryService } from '../user/infrastructure/repositories/user-repository/user-repository.service';

@Module({
  imports: [ContentModule],
  controllers: [TopicController], // Change to TopicController
  providers: [
    TopicService, // Change to TopicService
    TopicRepositoryService,
    PrismaClient,
    JwtService,
    ContentController,
    UserService,
    UserRepositoryService
  ],
})
export class TopicModule {
  // Change to TopicModule
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes('topic'); // Change the route to 'topic'
  }
}
