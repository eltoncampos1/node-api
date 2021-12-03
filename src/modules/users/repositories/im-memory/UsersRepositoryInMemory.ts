import { ICreateUserDTO } from 'modules/users/dtos/ICreateUserDTO';
import { User } from 'modules/users/entities/User';
import { IUsersRepository } from '../IUsersRepositories';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ name, email, phone, age, ethnicity, weight }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      phone,
      age,
      ethnicity,
      weight,
    });

    this.users.push(user);
  }
}

export { UsersRepositoryInMemory };
