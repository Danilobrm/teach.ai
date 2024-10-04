import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryService } from '../../infrastructure/repositories/user-repository/user-repository.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async createUser(
    email: string,
    password: string,
    studyTrackId: string,
    role: string,
    dailyStudyTime: number,
  ): Promise<User> {
    const user = new User(
      null,
      email,
      password,
      studyTrackId,
      role,
      dailyStudyTime,
    );
    return this.userRepository.create(user);
  }

  async getUserById(user_id: string): Promise<User> {
    return this.userRepository.getUserById(user_id);
  }
}
