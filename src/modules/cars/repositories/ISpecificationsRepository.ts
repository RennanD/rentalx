import { ISpecificationsDTO } from '../dtos/ISpecificationsDTO';
import { Specification } from '../entities/Specification';

export interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  create({ name, description }: ISpecificationsDTO): Promise<void>;
}
