import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  authenticate(
    @Body() body: { password: string; email: string },
    @Res() res: Response,
  ): Response<{ message: string; status: number; token: string }> {
    return res.json({
      statusCode: res.statusCode,
      message: 'Login efetuado com sucesso!',
      token: this.authService.authenticate(body.email, res.req.user_id),
    });
  }
}
