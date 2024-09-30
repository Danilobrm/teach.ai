import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryService } from '../../infrastructure/repositories/user-repository/user-repository.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async createUser(email: string, password: string): Promise<User> {
    const user = new User(null, email, password);
    return this.userRepository.create(user);
  }
}
