/* eslint-disable prettier/prettier */
import { AppError } from 'errors/errors';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('PostgresUsersRepository')
    private usersRepository: IUsersRepository,
  ) { }


  async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.findByID(user_id)

    if (!user) {
      throw new AppError("User not found")
    }

    await this.usersRepository.delete(user_id)
  }
}

export { DeleteUserUseCase }