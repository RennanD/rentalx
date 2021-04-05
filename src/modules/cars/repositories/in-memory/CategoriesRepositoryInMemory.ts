import { ICategoryDTO } from '../../dtos/ICategoryDTO';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  public async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
  public async list(): Promise<Category[]> {
    return this.categories;
  }
  public async create({ name, description }: ICategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
