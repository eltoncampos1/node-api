/* eslint-disable prettier/prettier */
import { AppError } from 'errors/errors';
import { IUpdateAddressDTO } from 'modules/address/dtos/IUpdateAddressDTO';
import { IAddressRepository } from 'modules/address/repositories/IAddressRepository';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateAddressUseCase {
  constructor(
    @inject('PostgresUsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository
  ) { }

  async execute({ userId, city, state, street, number, zip_code, complement }: IUpdateAddressDTO): Promise<void> {
    const user = await this.usersRepository.findByID(userId as string);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (!user.address) {
      throw new AppError('Address unregistered')
    }

    const { id } = user.address

    const address = await this.addressRepository.findByID(id as string)

    address.city = city as string
    address.number = number as number
    address.street = street as string
    address.state = state as string
    address.zip_code = zip_code as string
    address.complement = complement as string


    await this.addressRepository.save(address);
  }
}

export { UpdateAddressUseCase };
