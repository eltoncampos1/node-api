/* eslint-disable prettier/prettier */
import { IHashProvider } from 'modules/users/providers/HashProvider/models/IHashProvider';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/errors';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepositories';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('PostgresUsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  async execute({ name, email, password, ethnicity, age, phone, weight }: ICreateUserDTO): Promise<void> {

    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new AppError("This user already exists")
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    await this.usersRepository.create({
      name,
      email,
      age,
      password: hashedPassword,
      phone,
      weight,
      ethnicity,
    });
  }
}

export { CreateUserUseCase };
