import { ICategoryDTO } from '../dtos/ICategoryDTO';
import { Category } from '../models/Category';

export interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICategoryDTO): void;
}
