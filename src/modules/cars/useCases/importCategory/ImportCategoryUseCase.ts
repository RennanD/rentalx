import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public execute(file: any): void {
    console.log(file);
  }
}

export { ImportCategoryUseCase };
