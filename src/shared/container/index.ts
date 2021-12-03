import { PostgresUsersRepository } from 'modules/users/implementations/PostegresUsersRepository';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepositories';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>('PostgresUsersRepository', PostgresUsersRepository);
