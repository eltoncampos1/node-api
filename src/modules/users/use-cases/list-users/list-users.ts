/* eslint-disable prettier/prettier */
import { User } from 'modules/users/entities/User';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('PostgresUsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute(): Promise<User[]> {
    return this.usersRepository.list()
  }
}

export { ListUsersUseCase }