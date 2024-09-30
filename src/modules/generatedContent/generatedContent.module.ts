import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GeneratedContentController } from './application/controllers/generatedContent.controller';
import { GeneratedContentService } from './application/services/generatedContent.service';
import { GeneratedContentRepositoryService } from './infrastructure/repositories/generatedContent-repository/generatedContent-repository.service';
import { isAuthenticated } from '../../common/middlewares/isAuthenticated';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '../auth/infrastructure/services/jwt.service';

@Module({
  controllers: [GeneratedContentController, GeneratedContentController], // Add GeneratedContentController if it exists
  providers: [
    PrismaClient,
    GeneratedContentService,
    GeneratedContentRepositoryService,
    JwtService,
  ],
  exports: [GeneratedContentRepositoryService],
})
export class GeneratedContentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes('generatedContent');
  }
}
