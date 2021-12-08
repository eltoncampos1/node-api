/* eslint-disable prettier/prettier */
import { AppError } from 'errors/errors';
import { sign } from 'jsonwebtoken';
import { IHashProvider } from 'modules/users/providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';

export interface IRequest {
  email: string;
  password: string
}

export interface IReturn {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('PostgresUsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("Email or password incorrect!")
    }

    const passwordMatch = await this.hashProvider.compareHash(password, user.password)

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!")
    }

    const token = sign({}, String(process.env.JWT_HASH), {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }
  }
}

export { AuthenticateUserUseCase }