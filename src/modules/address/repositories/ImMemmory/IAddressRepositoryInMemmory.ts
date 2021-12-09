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

  async save(address: Address): Promise<void> {
    await this.address.push(address);
  }

  async findByID(address_id: string): Promise<Address> {
    const address = this.address.find(adress => adress.id === address_id);

    return address as Address;
  }
}

export { IAddresRepositoryInMemmory };
