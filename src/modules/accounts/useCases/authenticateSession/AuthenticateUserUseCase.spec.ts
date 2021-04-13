import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UnauthorizedError } from '@shared/errors/UnauthorizedError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

describe('Authenticate user', () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('show be able authenticate a user', async () => {
    const user: ICreateUserDTO = {
      name: 'any name',
      email: 'any@email.com',
      password: 'any password',
      drive_license: 'any drive license',
    };

    await createUserUseCase.execute(user);

    const sesstion = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(sesstion).toHaveProperty('token');
  });

  it('show not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'any_email@email.com',
        password: 'any user',
      });
    }).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('show not be able to authenticate a user with invalid password', async () => {
    const user: ICreateUserDTO = {
      name: 'any name',
      email: 'any@email.com',
      password: 'correct password',
      drive_license: 'any drive license',
    };

    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'any_email@email.com',
        password: 'incorrect password',
      });
    }).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
