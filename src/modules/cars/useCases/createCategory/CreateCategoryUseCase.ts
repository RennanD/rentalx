import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository
  ) {}

  public async execute({ name, description }: IRequest): Promise<void> {
    const existentCategory = await this.categoryRepository.findByName(name);

    if (existentCategory) {
      throw new AppError('Category already exists');
    }

    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
