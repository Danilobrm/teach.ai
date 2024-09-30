import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
// import { AuthController } from './application/controllers/auth/auth.controller';
import { UserController } from './application/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { UserRepositoryService } from './infrastructure/repositories/user-repository/user-repository.service';
import { CheckEmailMiddleware } from '../../common/middlewares/CheckEmail';
import { PrismaClient } from '@prisma/client';
@Module({
  controllers: [UserController],
  providers: [PrismaClient, UserService, UserRepositoryService],
  exports: [UserRepositoryService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckEmailMiddleware)
      .forRoutes({ path: 'user/register', method: RequestMethod.POST });
  }
}
