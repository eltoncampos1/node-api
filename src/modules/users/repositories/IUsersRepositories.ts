import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findByID(user_id: string): Promise<User | undefined>;
  save(user: User): Promise<void>;
  delete(user_id: string): Promise<void>;
}

export { IUsersRepository };
