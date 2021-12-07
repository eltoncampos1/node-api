/* eslint-disable camelcase */
import { ICreateUserDTO } from 'modules/users/dtos/ICreateUserDTO';
import { User } from 'modules/users/entities/User';
import { IUsersRepository } from '../IUsersRepositories';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

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

  async passwordHash(password: string): Promise<string> {
    const passwordHash = `${password}123`;

    return passwordHash;
  }

  async comparePassword(password: string, user_password: string): Promise<boolean> {
    if (password === user_password) {
      return true;
    }
    return false;
  }

  async generateToken(user: User): Promise<string> {
    const token = 'token';

    return token;
  }
}

export { UsersRepositoryInMemory };
