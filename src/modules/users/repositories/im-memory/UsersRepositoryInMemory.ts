/* eslint-disable camelcase */
import { ICreateUserDTO } from 'modules/users/dtos/ICreateUserDTO';
import { User } from 'modules/users/entities/User';
import { IUsersRepository } from '../IUsersRepositories';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  generateToken(user: User): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async create({ name, email, password, phone, age, ethnicity, weight }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      phone,
      age,
      ethnicity,
      weight,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(usr => usr.email === email);

    return user;
  }

  passwordHash(password: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  comparePassword(password: string, user_password: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

export { UsersRepositoryInMemory };
