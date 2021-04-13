import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UnauthorizedError } from '@shared/errors/UnauthorizedError';

interface IRequest {
  email: string;
  password: string;
}

interface ISession {
  user: {
    name: string;
    email: string;
  };

  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ email, password }: IRequest): Promise<ISession> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Email/Password invalid combination');
    }

    const passwordHasMatch = await compare(password, user.password);

    if (!passwordHasMatch) {
      throw new UnauthorizedError('Email/Password invalid combination');
    }

    const token = sign({}, 'e66d837d13a097577d969b59917bfa84', {
      subject: user.id,
      expiresIn: '1d',
    });

    const session = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return session;
  }
}

export { AuthenticateUserUseCase };
