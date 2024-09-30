import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<void>;
  // findByUsername(username: string): Promise<User>;
}
