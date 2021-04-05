import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
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
});
