/* eslint-disable prettier/prettier */
import { AppError } from 'errors/errors';
import { IHashProvider } from 'modules/users/providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';

type IRequest = {
  user_id: string;
  password: string;
  old_password: string
}


@injectable()
class UpdatePasswordUseCase {
  constructor(
    @inject('PostgresUsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  async execute({ user_id, password, old_password }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByID(user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    if (password && !old_password) {
      throw new AppError('You need to inform the old password to set a new password.')
    }

    if (password && old_password) {

      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('Passwords does not match')
      }

      user.password = await this.hashProvider.generateHash(password)
    }
    await this.usersRepository.save(user)
  }
}

export { UpdatePasswordUseCase }
