import { ICreateUserDTO } from 'modules/users/dtos/ICreateUserDTO';
import FakeHashProvider from 'modules/users/providers/HashProvider/fake/fakeHashProvider';
import { UsersRepositoryInMemory } from 'modules/users/repositories/im-memory/UsersRepositoryInMemory';
import { AppError } from '../../../../errors/errors';
import { CreateUserUseCase } from '../create-user/create-user';
import { AuthenticateUserUseCase } from './autenticate-user';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let hashProvider: FakeHashProvider;
describe('Authentica user', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    usersRepository = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository, hashProvider);
    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);
  });
  it('Should be able to authenticate an user session', async () => {
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

    const result = await authenticateUserUseCase.execute({ email: user.email, password: user.password });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate an user with incorrect email', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({ email: 'false@email', password: '1234' });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate an user with incorrect password', async () => {
    expect(async () => {
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

      await authenticateUserUseCase.execute({ email: user.email, password: 'incorrect_password' });
    }).rejects.toBeInstanceOf(AppError);
  });
});
