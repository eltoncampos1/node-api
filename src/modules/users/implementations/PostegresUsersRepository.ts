import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { IUsersRepository } from '../repositories/IUsersRepositories';

class PostgresUsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ id, name, phone, email, weight, age, ethnicity }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      email,
      phone,
      weight,
      ethnicity,
      age,
    });

    await this.repository.save(user);
  }
}

export { PostgresUsersRepository };
