import { Etnia } from '../entities/User';

interface IUpdateUserDTO {
  user_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  age?: number;
  weight?: number;
  ethnicity?: Etnia;
}

export { IUpdateUserDTO };
