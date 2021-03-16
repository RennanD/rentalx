import { Router } from 'express';

import { CategoryRepository } from '../modules/cars/repositories/CategoryRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';

const categoriesRouter = Router();
const categoryRepository = new CategoryRepository();

categoriesRouter.get('/', (request, response) => {
  const categories = categoryRepository.list();

  return response.json(categories);
});

categoriesRouter.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

export { categoriesRouter };
