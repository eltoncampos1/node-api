import { AppError } from 'errors/errors';
import { ICreateUserDTO } from 'modules/users/dtos/ICreateUserDTO';
import { IUpdateUserDTO } from 'modules/users/dtos/IUpdateUserDTO';
import FakeHashProvider from 'modules/users/providers/HashProvider/fake/fakeHashProvider';
import { UsersRepositoryInMemory } from 'modules/users/repositories/im-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../create-user/create-user';
import { UpdateUserUseCase } from './update-user';

let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let updateUserUseCase: UpdateUserUseCase;
let hashProvider: FakeHashProvider;

describe('Update User', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);
    updateUserUseCase = new UpdateUserUseCase(usersRepository);
  });

  it('should be able to update user name', async () => {
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

    const updatedUser = {
      user_id: usersRepository.users[0].id,
      name: 'new_name',
    };

    await updateUserUseCase.execute(updatedUser);

    expect(usersRepository.users[0].name).toBe('new_name');
  });

  it('should be able to update user phone', async () => {
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

    const updatedUser = {
      user_id: usersRepository.users[0].id,
      phone: 'new_phone',
    };

    await updateUserUseCase.execute(updatedUser);

    expect(usersRepository.users[0].phone).toBe('new_phone');
  });

  it('should be able to update user email', async () => {
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

    const updatedUser = {
      user_id: usersRepository.users[0].id,
      email: 'new_email@teste',
    };

    await updateUserUseCase.execute(updatedUser);

    expect(usersRepository.users[0].email).toBe('new_email@teste');
  });
  it('should be able to update user age', async () => {
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

    const updatedUser = {
      user_id: usersRepository.users[0].id,
      age: 21,
    };

    await updateUserUseCase.execute(updatedUser);

    expect(usersRepository.users[0].age).toBe(21);
  });

  it('should be able to update user weight', async () => {
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

    const updatedUser = {
      user_id: usersRepository.users[0].id,
      weight: 65,
    };

    await updateUserUseCase.execute(updatedUser);

    expect(usersRepository.users[0].weight).toBe(65);
  });

  it('should be able to update user ethincity', async () => {
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

    const updatedUser: IUpdateUserDTO = {
      user_id: usersRepository.users[0].id,
      ethnicity: 'pardo',
    };

    await updateUserUseCase.execute(updatedUser);

    expect(usersRepository.users[0].ethnicity).toBe('pardo');
  });
  it('should not be able to update the user with wrong user_id', async () => {
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
        name: 'new_name',
      };

      await updateUserUseCase.execute(updatedPasswordUser);
    }).rejects.toBeInstanceOf(AppError);
  });
});
