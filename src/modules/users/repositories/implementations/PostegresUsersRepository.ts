/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepositories';

class PostgresUsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
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

  async passwordHash(password: string): Promise<string> {
    const hashedPassword = await hash(password, 8);

    return hashedPassword;
  }

  async comparePassword(password: string, user_password: string): Promise<boolean> {
    const passwordMatch = await compare(password, user_password);

    return passwordMatch;
  }

  async generateToken(user: User): Promise<string> {
    const token = sign({}, String(process.env.JWT_HASH), {
      subject: user.id,
      expiresIn: '1d',
    });

    return token;
  }
}

export { PostgresUsersRepository };
