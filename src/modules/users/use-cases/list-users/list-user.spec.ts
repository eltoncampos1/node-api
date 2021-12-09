import FakeHashProvider from 'modules/users/providers/HashProvider/fake/fakeHashProvider';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/im-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../create-user/create-user';

let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let hashProvider: FakeHashProvider;
describe('List Users', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);
  });

  it('should be able to list users', async () => {
    const user: ICreateUserDTO = {
      name: 'user',
      phone: 'user_phone',
      password: '1234',
      email: 'user@email.com',
      age: 20,
      weight: 60,
      ethnicity: 'branco',
    };

    const user2: ICreateUserDTO = {
      name: 'user2',
      phone: 'user_phone2',
      password: '12342',
      email: 'user2@email.com',
      age: 20,
      weight: 60,
      ethnicity: 'pardo',
    };

    await createUserUseCase.execute(user);
    await createUserUseCase.execute(user2);

    expect(usersRepository.users.length).toBe(2);
  });
});
