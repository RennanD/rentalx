import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    name,
    email,
    password,
    drive_license,
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    const existentUser = await this.usersRepository.findByEmail(email);

    if (existentUser) {
      throw new AppError('User aleready exists');
    }

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      drive_license,
    });
  }
}

export { CreateUserUseCase };
