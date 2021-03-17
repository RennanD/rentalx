import { ICategoryDTO } from '../../dtos/ICategoryDTO';
import { Category } from '../../models/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoryRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoryRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoryRepository {
    if (!CategoryRepository.INSTANCE) {
      CategoryRepository.INSTANCE = new CategoryRepository();
    }

    return CategoryRepository.INSTANCE;
  }

  public list(): Category[] {
    return this.categories;
  }

  public create({ name, description }: ICategoryDTO): void {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() });

    this.categories.push(category);
  }

  public findByName(name: string): Category {
    const findCategory = this.categories.find(
      (category) => category.name.toUpperCase() === name.toUpperCase()
    );

    return findCategory;
  }
}

export { CategoryRepository };
