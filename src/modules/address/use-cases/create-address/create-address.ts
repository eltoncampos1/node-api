/* eslint-disable prettier/prettier */
import { AppError } from 'errors/errors';
import { ICreateAddressDTO } from 'modules/address/dtos/ICreateAddressDTO';
import { IAddressRepository } from 'modules/address/repositories/IAddressRepository';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateAddressUseCase {
  constructor(
    @inject('PostgresUsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AddressRepository')
    private addresRepository: IAddressRepository,
  ) { }

  async execute({ userId, city, complement, zip_code, street, state, number }: ICreateAddressDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByID(userId)

    if (!userAlreadyExists) {
      throw new AppError('User not found')
    }

    if (userAlreadyExists.address) {
      throw new AppError('Address already register, please update the address in update section')
    }

    if (!street) {
      throw new AppError(`Missing information: street`)
    }
    if (!city) {
      throw new AppError('Missing information: city')
    }

    if (!zip_code) {
      throw new AppError('Missing information: zip_code')
    }

    if (!state) {
      throw new AppError('Missing information: state')
    }

    if (!number) {
      throw new AppError('Missing information: number')
    }


    await this.addresRepository.create({
      user: userAlreadyExists,
      userId,
      city,
      number,
      state,
      street,
      zip_code,
      complement
    })
  }
}

export { CreateAddressUseCase }