import { ISpecificationsDTO } from '../../dtos/ISpecificationsDTO';
import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }

    return SpecificationRepository.INSTANCE;
  }

  public findByName(name: string): Specification {
    const findedSpecification = this.specifications.find(
      (specification) => specification.name.toUpperCase() === name.toUpperCase()
    );

    return findedSpecification;
  }

  public create({ name, description }: ISpecificationsDTO): void {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });

    this.specifications.push(specification);
  }
}

export { SpecificationRepository };
