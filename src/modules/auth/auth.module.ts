import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './application/controllers/auth.controller';
import { JwtService } from './infrastructure/services/jwt.service';
import { ValidateUserAuthentication } from '../../common/middlewares/ValidateUserAuthentication';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, ValidateUserAuthentication],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateUserAuthentication)
      .forRoutes({ path: 'login', method: RequestMethod.POST });
  }
}
