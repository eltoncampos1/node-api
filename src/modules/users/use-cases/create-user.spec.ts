import { AppError } from '../../../errors/errors';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../repositories/im-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './create-user';

let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe('Create User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create a new user', async () => {
    const user: ICreateUserDTO = {
      name: 'user',
      phone: 'user_phone',
      email: 'user@email.com',
      age: 20,
      weight: 60,
      ethnicity: 'branco',
    };

    await createUserUseCase.execute(user);

    expect(usersRepository.users[0]).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existing email', async () => {
    const user1: ICreateUserDTO = {
      name: 'user',
      phone: 'user_phone',
      email: 'user@email.com',
      age: 20,
      weight: 60,
      ethnicity: 'branco',
    };

    const user2: ICreateUserDTO = {
      name: 'user2',
      phone: 'user2_phone',
      email: 'user@email.com',
      age: 20,
      weight: 60,
      ethnicity: 'branco',
    };

    await createUserUseCase.execute(user1);

    expect(async () => {
      await createUserUseCase.execute(user2);
    }).rejects.toBeInstanceOf(AppError);
  });
});
