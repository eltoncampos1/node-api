/* eslint-disable prettier/prettier */
import { AppError } from 'errors/errors';
import { IUpdateUserDTO } from 'modules/users/dtos/IUpdateUserDTO';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('PostgresUsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ user_id, age, email, name, ethnicity, phone, weight }: IUpdateUserDTO) {
    const user = await this.usersRepository.findByID(user_id as string)

    if (!user) {
      throw new AppError("User not found")
    }

    Object.assign(user, {
      age,
      email,
      name,
      phone,
      ethnicity,
      weight
    })
    await this.usersRepository.save(user)
  }
}

export { UpdateUserUseCase };
