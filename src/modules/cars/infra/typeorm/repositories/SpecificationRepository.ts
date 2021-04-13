import { getRepository, Repository } from 'typeorm';

import { ISpecificationsDTO } from '@modules/cars/dtos/ISpecificationsDTO';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

import { Specification } from '../entities/Specification';

class SpecificationRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }

  public async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      name,
    });

    return specification;
  }

  public async create({
    name,
    description,
  }: ISpecificationsDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }
}

export { SpecificationRepository };
