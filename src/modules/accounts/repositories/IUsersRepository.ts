import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

export interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<void>;
}
