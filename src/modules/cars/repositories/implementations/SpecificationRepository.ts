import { getRepository, Repository } from 'typeorm';

import { ISpecificationsDTO } from '@modules/cars/dtos/ISpecificationsDTO';
import { Specification } from '@modules/cars/entities/Specification';

import { ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
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
  }: ISpecificationsDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }
}

export { SpecificationRepository };
