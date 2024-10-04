import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ContentService } from './application/services/content.service';
import { ContentRepositoryService } from './infrastructure/repositories/content-repository/content-repository.service';
import { isAuthenticated } from '../../common/middlewares/isAuthenticated';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '../auth/infrastructure/services/jwt.service';
import { UserService } from '../user/application/services/user.service';
import { UserRepositoryService } from '../user/infrastructure/repositories/user-repository/user-repository.service';

@Module({
  controllers: [],
  providers: [
    PrismaClient,
    ContentService,
    ContentRepositoryService,
    JwtService,
    UserService,
    UserRepositoryService
  ],
  exports: [ContentService, ContentRepositoryService]
})
export class ContentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes('content');
  }
}
