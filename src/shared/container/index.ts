import { BCryptHashProvider } from 'modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from 'modules/users/providers/HashProvider/models/IHasProvider';
import { PostgresUsersRepository } from 'modules/users/repositories/implementations/PostegresUsersRepository';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepositories';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>('PostgresUsersRepository', PostgresUsersRepository);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
