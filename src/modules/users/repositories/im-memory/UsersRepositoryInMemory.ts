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

  async list(): Promise<User[]> {
    const all = await this.users;

    return all;
  }

  async findByID(user_id: string): Promise<User | undefined> {
    const user = this.users.find(us => us.id === user_id);

    return user;
  }

  async save(user: User): Promise<void> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;
  }

  async delete(user_id: string): Promise<void> {
    const userIdx = await this.users.findIndex(us => us.id === user_id);

    this.users.splice(userIdx, 1);
  }
}

export { UsersRepositoryInMemory };
