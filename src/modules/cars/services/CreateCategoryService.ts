import { AppError } from '../../../errors/AppError';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoryRepository: ICategoriesRepository) {}

  public execute({ name, description }: IRequest): void {
    const existentCategory = this.categoryRepository.findByName(name);

    if (existentCategory) {
      throw new AppError('Category already exists');
    }

    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryService };
