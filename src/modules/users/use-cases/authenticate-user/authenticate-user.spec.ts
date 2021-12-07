import { ICreateUserDTO } from 'modules/users/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from 'modules/users/repositories/im-memory/UsersRepositoryInMemory';
import { AppError } from '../../../../errors/errors';
import { CreateUserUseCase } from '../create-user/create-user';
import { AuthenticateUserUseCase } from './autenticate-user';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe('Authentica user', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
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
