import { ICreateAddressDTO } from 'modules/address/dtos/ICreateAddressDTO';
import { IAddresRepositoryInMemmory } from 'modules/address/repositories/ImMemmory/IAddressRepositoryInMemmory';
import { ICreateUserDTO } from 'modules/users/dtos/ICreateUserDTO';
import FakeHashProvider from 'modules/users/providers/HashProvider/fake/fakeHashProvider';
import { UsersRepositoryInMemory } from 'modules/users/repositories/im-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from 'modules/users/use-cases/create-user/create-user';
import { CreateAddressUseCase } from './create-address';

let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let hashProvider: FakeHashProvider;
let addressRepository: IAddresRepositoryInMemmory;
let createAddressUseCase: CreateAddressUseCase;
describe('Create User', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);
    addressRepository = new IAddresRepositoryInMemmory();
    createAddressUseCase = new CreateAddressUseCase(usersRepository, addressRepository);
  });

  it('should be able to create a new address', async () => {
    const user: ICreateUserDTO = {
      name: 'user',
      phone: 'user_phone',
      password: '1234',
      email: 'user@email.com',
      age: 20,
      weight: 60,
      ethnicity: 'branco',
    };

    await createUserUseCase.execute(user);

    const address: ICreateAddressDTO = {
      city: 'city',
      number: 1,
      state: 'state',
      street: 'street',
      zip_code: 'zip_code',
      complement: 'complement',
      user: usersRepository.users[0],
      userId: usersRepository.users[0].id as string,
    };

    await createAddressUseCase.execute(address);

    expect(addressRepository.address[0]).toHaveProperty('id');
  });

  // it('should not be able to create a new user with an existing email', async () => {
  //   const user1: ICreateUserDTO = {
  //     name: 'user',
  //     phone: 'user_phone',
  //     password: '1234',
  //     email: 'user@email.com',
  //     age: 20,
  //     weight: 60,
  //     ethnicity: 'branco',
  //   };

  //   const user2: ICreateUserDTO = {
  //     name: 'user2',
  //     phone: 'user2_phone',
  //     password: '1234',
  //     email: 'user@email.com',
  //     age: 20,
  //     weight: 60,
  //     ethnicity: 'branco',
  //   };

  //   await createUserUseCase.execute(user1);

  //   expect(async () => {
  //     await createUserUseCase.execute(user2);
  //   }).rejects.toBeInstanceOf(AppError);
  // });
});