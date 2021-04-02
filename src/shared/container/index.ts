import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoryRepository } from '../../modules/cars/repositories/implementations/CategoryRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoryRepository',
  CategoryRepository
);
