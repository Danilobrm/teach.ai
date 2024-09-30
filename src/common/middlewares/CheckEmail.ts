import { UserRepositoryService } from '../../modules/user/infrastructure/repositories/user-repository/user-repository.service';
import { UserEmail } from '../../modules/user/domain/value-objects/UserEmail';
import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppError } from '../errors/AppError';

@Injectable()
export class CheckEmailMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserRepositoryService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email) {
      return next();
    }

    const userEmail = new UserEmail(email);

    if (!userEmail.getEmail()) {
      return next(new AppError(`Email inválido.`, 409));
    }

    const existingUser = await this.userService.getUserByEmail(
      userEmail.getEmail(),
    );

    if (existingUser) {
      return next(new AppError(`O email "${email}" já está em uso.`, 409));
    }

    next();
  }
}
