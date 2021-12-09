import { ICreateAddressDTO } from 'modules/address/dtos/ICreateAddressDTO';
import { Address } from 'modules/address/entities/Address';
import { User } from 'modules/users/entities/User';
import { IAddressRepository } from '../IAddressRepository';

class IAddresRepositoryInMemmory implements IAddressRepository {
  address: Address[] = [];

  users: User[] = [];

  async create({ user, userId, complement, street, city, zip_code, state, number }: ICreateAddressDTO): Promise<void> {
    const address = new Address();

    Object.assign(address, { user, userId, complement, street, city, zip_code, state, number });

    this.address.push(address);
  }
}

export { IAddresRepositoryInMemmory };
