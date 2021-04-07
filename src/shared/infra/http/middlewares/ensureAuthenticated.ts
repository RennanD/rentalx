import { NextFunction, Request, Response } from 'express';
import { verify, TokenExpiredError } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

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
    throw new AppError('Token missing', 401, 'auth_error');
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
      throw new AppError("User does'nt exists!", 401, 'auth_error');
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError('Your token has expired', 401, 'expired_token');
    }
    throw new AppError('Invalid token', 401, 'auth_error');
  }
}
