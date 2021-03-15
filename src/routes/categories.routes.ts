import { Router } from 'express';

import { CategoryRepository } from '../repositories/CategoryRepository';

const categoriesRouter = Router();
const categoryRepository = new CategoryRepository();

categoriesRouter.post('/', (request, response) => {
  const { name, description } = request.body;

  categoryRepository.create({ name, description });

  return response.status(201).send();
});

export { categoriesRouter };
