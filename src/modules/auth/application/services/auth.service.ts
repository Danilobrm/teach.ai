import { Injectable } from '@nestjs/common';
import { AppError } from 'src/common/errors/AppError';
import { JwtService } from '../../infrastructure/services/jwt.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  authenticate(email: string, id: string): string {
    return this.jwtService.generateToken(email, id);
  }
}
