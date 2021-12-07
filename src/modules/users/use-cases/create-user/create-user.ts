/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/errors';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepositories';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('PostgresUsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute({ name, email, password, ethnicity, age, phone, weight }: ICreateUserDTO): Promise<void> {

    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new AppError("This user already exists")
    }

    const passwordHashed = await this.usersRepository.passwordHash(password)

    await this.usersRepository.create({
      name,
      email,
      age,
      password: passwordHashed,
      phone,
      weight,
      ethnicity,
    });
  }
}

export { CreateUserUseCase };
