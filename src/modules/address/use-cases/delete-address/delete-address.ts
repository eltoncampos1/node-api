/* eslint-disable prettier/prettier */
import { AppError } from 'errors/errors';
import { Address } from 'modules/address/entities/Address';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteAddressUseCase {
  constructor(
    @inject('PostgresUsersRepository')
    private usersRepository: IUsersRepository,

  ) { }

  async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.findByID(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    user.address = null as unknown as Address

    await this.usersRepository.save(user)
  }
}


export { DeleteAddressUseCase }