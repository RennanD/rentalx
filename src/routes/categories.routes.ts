import { Router } from 'express';

import { CategoryRepository } from '../repositories/CategoryRepository';

const categoriesRouter = Router();
const categoryRepository = new CategoryRepository();

categoriesRouter.get('/', (request, response) => {
  const categories = categoryRepository.list();

  return response.json(categories);
});

categoriesRouter.post('/', (request, response) => {
  const { name, description } = request.body;

  const existentCategory = categoryRepository.findByName(name);

  if (existentCategory) {
    return response.status(400).json({ error: 'Category already exists' });
  }

  categoryRepository.create({ name, description });

  return response.status(201).send();
});

export { categoriesRouter };
