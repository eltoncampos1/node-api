import { AppError } from 'errors/errors';
import { ICreateUserDTO } from 'modules/users/dtos/ICreateUserDTO';
import FakeHashProvider from 'modules/users/providers/HashProvider/fake/fakeHashProvider';
import { UsersRepositoryInMemory } from 'modules/users/repositories/im-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../create-user/create-user';
import { DeleteUserUseCase } from './delete-user';

let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let deleteUserUseCase: DeleteUserUseCase;
let hashProvider: FakeHashProvider;
describe('Delete User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    hashProvider = new FakeHashProvider();
    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);
    deleteUserUseCase = new DeleteUserUseCase(usersRepository);
  });

  it('should be able to delete an user', async () => {
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

    await deleteUserUseCase.execute(usersRepository.users[0].id);

    expect(usersRepository.users.length).toBe(0);
  });

  it('should not be able to delete an user without an user_id', async () => {
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

    expect(async () => {
      await deleteUserUseCase.execute('wrong_user_id');
    }).rejects.toBeInstanceOf(AppError);
  });
});
