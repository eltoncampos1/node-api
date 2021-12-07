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
}

export { UsersRepositoryInMemory };
