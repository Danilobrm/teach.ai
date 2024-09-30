import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Password } from '../../domain/value-objects/UserPassword';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() body: { password: string; email: string },
    @Res() res: Response,
  ): Promise<Response<{ message: string; status: number }>> {
    const password = await Password.create(body.password);

    await this.userService.createUser(body.email, password.getHashedPassword());

    return res.json({
      statusCode: res.statusCode,
      message: 'conta criada com sucesso!',
    });
  }
}
