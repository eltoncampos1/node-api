import { ICreateAddressDTO } from 'modules/address/dtos/ICreateAddressDTO';
import { Address } from 'modules/address/entities/Address';
import { getRepository, Repository } from 'typeorm';
import { IAddressRepository } from '../IAddressRepository';

class AddressPostgresRepository implements IAddressRepository {
  private addresRepository: Repository<Address>;

  constructor() {
    this.addresRepository = getRepository(Address);
  }

  async create(data: ICreateAddressDTO): Promise<void> {
    const address = this.addresRepository.create(data);

    await this.addresRepository.save(address);
  }

  async save(address: Address): Promise<void> {
    await this.addresRepository.save(address);
  }

  async findByID(address_id: string): Promise<Address> {
    const address = await this.addresRepository.findOne(address_id);

    return address as Address;
  }
}

export { AddressPostgresRepository };
