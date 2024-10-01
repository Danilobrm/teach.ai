// auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../modules/auth/infrastructure/services/jwt.service';
import { AppError } from '../errors/AppError';
import { UserService } from 'src/modules/user/application/services/user.service';

@Injectable()
export class isAuthenticated implements NestMiddleware {
  private readonly jwtSecret: string = process.env.JWT_SECRET;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken)
      return res.status(401).json({
        statusCode: res.statusCode,
        message: 'Usuário precisa estar logado.',
      });

    const [, token] = authToken.split(' ');

    try {
      // validar o token
      const { sub } = this.jwtService.verifyToken(token);

      const user = await this.userService.getUserById(sub);

      if (!user) {
        return res.status(401).json({
          status: res.statusCode,
          message: 'token inválido!',
        });
      }
      req.user_id = sub;
      return next();
    } catch (error) {
      throw new AppError('Token inválido!', 401);
    }
  }
}
