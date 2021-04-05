import { ICategoryDTO } from '../dtos/ICategoryDTO';
import { Category } from '../entities/Category';

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICategoryDTO): Promise<void>;
}
