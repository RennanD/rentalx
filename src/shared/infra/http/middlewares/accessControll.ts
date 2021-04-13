import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UnauthorizedError } from '@shared/errors/UnauthorizedError';

export async function accessControll(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new UnauthorizedError('You did not have the required permissions');
  }

  return next();
}
