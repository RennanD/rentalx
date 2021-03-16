import { Router } from 'express';

import { CategoryRepository } from '../modules/cars/repositories/CategoryRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const categoriesRouter = Router();
const categoryRepository = new CategoryRepository();

categoriesRouter.get('/', (request, response) => {
  const categories = categoryRepository.list();

  return response.json(categories);
});

categoriesRouter.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategory = new CreateCategoryService(categoryRepository);

  try {
    createCategory.execute({
      description,
      name,
    });

    return response.status(201).send();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export { categoriesRouter };
