/* eslint-disable prettier/prettier */
import { AppError } from 'errors/errors';
import { Address } from 'modules/address/entities/Address';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListUserAddressUseCase {
  constructor(
    @inject('PostgresUsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute(user_id: string): Promise<Address> {
    const user = await this.usersRepository.findByID(user_id)

    if (!user) {
      throw new AppError("User does not exists.")
    }

    if (!user.address) {
      throw new AppError('unregistered address.')
    }


    return user.address

  }
}

export { ListUserAddressUseCase };
