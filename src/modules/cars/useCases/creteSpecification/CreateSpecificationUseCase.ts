import { inject, injectable } from 'tsyringe';

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}
  public async execute({ name, description }: IRequest): Promise<void> {
    const existentSpecification = await this.specificationsRepository.findByName(
      name
    );

    if (existentSpecification) {
      throw new BadRequestError('Specification already exists');
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
