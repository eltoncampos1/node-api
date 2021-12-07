import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  passwordHash(password: string): Promise<string>;
  comparePassword(password: string, user_password: string): Promise<boolean>;
  generateToken(user: User): Promise<string>;
}

export { IUsersRepository };
