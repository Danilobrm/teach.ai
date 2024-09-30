// auth.middleware.ts
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Password } from '../../modules/user/domain/value-objects/UserPassword';
import { UserRepositoryService } from 'src/modules/user/infrastructure/repositories/user-repository/user-repository.service';

@Injectable()
export class ValidateUserAuthentication implements NestMiddleware {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await this.userRepository.getUserByEmail(email);

    if (!user)
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: res.statusCode,
        message: 'Usuário não existe na base de dados!',
      });

    const passwordHashed = await Password.fromHashed(user.password);

    if (!(await passwordHashed.comparePassword(password)))
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ statusCode: res.statusCode, message: 'Senha incorreta!' });

    req.user_id = user.id;
    next();
  }
}
