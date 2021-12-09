import { ICreateAddressDTO } from '../dtos/ICreateAddressDTO';
import { Address } from '../entities/Address';

interface IAddressRepository {
  create(data: ICreateAddressDTO): Promise<void>;
  findByID(address_id: string): Promise<Address>;
  save(address: Address): Promise<void>;
}

export { IAddressRepository };
