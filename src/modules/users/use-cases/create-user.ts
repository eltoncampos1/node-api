/* eslint-disable prettier/prettier */
import { AppError } from 'errors/errors';
import { inject, injectable } from 'tsyringe';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUsersRepository } from '../repositories/IUsersRepositories';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('PostgresUsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute({ name, email, ethnicity, age, phone, weight }: ICreateUserDTO): Promise<void> {

    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new AppError("This user already exists")
    }

    await this.usersRepository.create({
      name,
      email,
      age,
      phone,
      weight,
      ethnicity,
    });
  }
}

export { CreateUserUseCase };
