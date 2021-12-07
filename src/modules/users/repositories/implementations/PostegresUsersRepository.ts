import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepositories';

class PostgresUsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async list(): Promise<User[]> {
    const users = this.repository.find();

    return users;
  }

  async create({ id, name, password, phone, email, weight, age, ethnicity }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      password,
      email,
      phone,
      weight,
      ethnicity,
      age,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findByID(user_id: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ id: user_id });

    return user;
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }
}

export { PostgresUsersRepository };
