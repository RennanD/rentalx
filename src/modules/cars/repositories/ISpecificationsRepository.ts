import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ISpecificationsDTO } from '../dtos/ISpecificationsDTO';

export interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  create({ name, description }: ISpecificationsDTO): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
