import { ISpecificationsDTO } from '../dtos/ISpecificationsDTO';
import { Specification } from '../entities/Specification';

export interface ISpecificationsRepository {
  findByName(name: string): Specification;
  create({ name, description }: ISpecificationsDTO): void;
}
