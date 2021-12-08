import { AppError } from 'errors/errors';
import { ICreateUserDTO } from 'modules/users/dtos/ICreateUserDTO';
import FakeHashProvider from 'modules/users/providers/HashProvider/fake/fakeHashProvider';
import { UsersRepositoryInMemory } from 'modules/users/repositories/im-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../create-user/create-user';
import { UpdatePasswordUseCase } from './update-profile';

let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let updatePasswordUseCase: UpdatePasswordUseCase;
let hashProvider: FakeHashProvider;

describe('Update Password', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);
    updatePasswordUseCase = new UpdatePasswordUseCase(usersRepository, hashProvider);
  });

  it('should be able to update the password', async () => {
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

    const updatedPasswordUser = {
      user_id: usersRepository.users[0].id,
      password: '123456',
      old_password: user.password,
    };

    await updatePasswordUseCase.execute(updatedPasswordUser);

    await expect(usersRepository.users[0].password).toBe('123456');
  });
  it('should not be able to update the password with wrong old_password', async () => {
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

    await expect(async () => {
      const updatedPasswordUser = {
        user_id: usersRepository.users[0].id,
        password: '123456',
        old_password: 'wrong_password',
      };

      await updatePasswordUseCase.execute(updatedPasswordUser);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong user_id', async () => {
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

    await expect(async () => {
      const updatedPasswordUser = {
        user_id: 'wrong_user_id',
        password: '123456',
        old_password: 'wrong_password',
      };

      await updatePasswordUseCase.execute(updatedPasswordUser);
    }).rejects.toBeInstanceOf(AppError);
  });
});
