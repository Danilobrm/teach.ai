import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { AppError } from 'src/common/errors/AppError';

@Injectable()
export class JwtService {
  private readonly jwtSecret: string = process.env.JWT_SECRET;

  generateToken(email: string, user_id: string): string {
    try {
      return sign({ email: email }, this.jwtSecret, {
        subject: user_id,
      });
    } catch (error) {
      throw new AppError('erro ao efetuar login!');
    }
  }

  verifyToken(token: string): any {
    return verify(token, this.jwtSecret);
  }
}
