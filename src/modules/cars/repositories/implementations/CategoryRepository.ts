import { getRepository, Repository } from 'typeorm';

import { ICategoryDTO } from '../../dtos/ICategoryDTO';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoryRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  public async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  public async create({ name, description }: ICategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  public async findByName(name: string): Promise<Category> {
    const findedCategory = await this.repository.findOne({
      name,
    });

    return findedCategory;
  }
}

export { CategoryRepository };
