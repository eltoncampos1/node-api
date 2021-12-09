import { Address } from 'modules/address/entities/Address';
import { Etnia } from '../entities/User';

interface ICreateUserDTO {
  id?: string;
  password: string;
  name: string;
  address?: Address;
  email: string;
  phone: string;
  age: number;
  weight: number;
  ethnicity: Etnia;
}

export { ICreateUserDTO };
