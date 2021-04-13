import { ISpecificationsDTO } from '@modules/cars/dtos/ISpecificationsDTO';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemori implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  public async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
  public async create({
    name,
    description,
  }: ISpecificationsDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return specifications;
  }
}

export { SpecificationsRepositoryInMemori };
