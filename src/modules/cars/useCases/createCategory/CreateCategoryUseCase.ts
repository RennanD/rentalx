import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  public execute({ name, description }: IRequest): void {
    const existentCategory = this.categoryRepository.findByName(name);

    if (existentCategory) {
      throw new Error('Category already exists');
    }

    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
