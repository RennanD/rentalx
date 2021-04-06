import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  public async create(userData: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      ...userData,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);
  }
  public async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  public async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
  public async save(user: User): Promise<void> {
    this.users = this.users.map((userItem) => {
      if (userItem.email === user.email) {
        return user;
      }
      return userItem;
    });
  }
}

export { UsersRepositoryInMemory };
