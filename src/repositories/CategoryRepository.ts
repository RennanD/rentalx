import { ICategoryDTO } from '../dtos/ICategoryDTO';
import { Category } from '../models/Category';

class CategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  public list(): Category[] {
    return this.categories;
  }

  public create({ name, description }: ICategoryDTO): void {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() });

    this.categories.push(category);
  }
}

export { CategoryRepository };
