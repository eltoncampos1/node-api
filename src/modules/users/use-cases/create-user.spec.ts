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
});
