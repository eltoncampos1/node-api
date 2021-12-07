import { container } from 'tsyringe';
import { BCryptHashProvider } from './implementations/BCryptHashProvider';
import { IHashProvider } from './models/IHasProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
