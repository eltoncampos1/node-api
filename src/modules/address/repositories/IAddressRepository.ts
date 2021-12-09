import { ICreateAddressDTO } from '../dtos/ICreateAddressDTO';

interface IAddressRepository {
  create(data: ICreateAddressDTO): Promise<void>;
  delete(address_id: string): Promise<void>;
}

export { IAddressRepository };
