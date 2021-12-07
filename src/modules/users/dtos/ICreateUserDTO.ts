import { Etnia } from '../entities/User';

interface ICreateUserDTO {
  id?: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  weight: number;
  ethnicity: Etnia;
}

export { ICreateUserDTO };
