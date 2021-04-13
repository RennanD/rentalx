import { NextFunction, Request, Response } from 'express';
import { verify, TokenExpiredError } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UnauthorizedError } from '@shared/errors/UnauthorizedError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('Token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      'e66d837d13a097577d969b59917bfa84'
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new UnauthorizedError("User does'nt exists!");
    }

    request.user = {
      id: user_id,
    };

    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError('Your token has expired', 'expired_token');
    }
    throw new UnauthorizedError('Invalid token', 401, 'auth_error');
  }
}
