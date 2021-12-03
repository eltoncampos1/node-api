/* eslint-disable prettier/prettier */
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
