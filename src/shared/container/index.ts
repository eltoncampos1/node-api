import { IAddressRepository } from 'modules/address/repositories/IAddressRepository';
import { AddressPostgresRepository } from 'modules/address/repositories/implementations/AddressPostgresRepository';
import { BCryptHashProvider } from 'modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from 'modules/users/providers/HashProvider/models/IHashProvider';
import { PostgresUsersRepository } from 'modules/users/repositories/implementations/PostegresUsersRepository';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepositories';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>('PostgresUsersRepository', PostgresUsersRepository);
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<IAddressRepository>('AddressRepository', AddressPostgresRepository);
