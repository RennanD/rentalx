import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  public async execute({ name, description }: IRequest): Promise<void> {
    const existentCategory = await this.categoryRepository.findByName(name);

    if (existentCategory) {
      throw new Error('Category already exists');
    }

    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
