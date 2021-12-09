import { User } from 'modules/users/entities/User';

interface ICreateAddressDTO {
  id?: string;
  userId: string;
  user?: User;
  street: string;
  number: number;
  complement?: string;
  zip_code: string;
  city: string;
  state: string;
}

export { ICreateAddressDTO };
