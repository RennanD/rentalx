import { Router } from 'express';

import { SpecificationRepository } from '../modules/cars/repositories/SpecificationRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationsRouter = Router();
const specificationsRepository = new SpecificationRepository();

specificationsRouter.post('/', (request, response) => {
  const { name, description } = request.body;

  const createSpecification = new CreateSpecificationService(
    specificationsRepository
  );

  try {
    createSpecification.execute({
      description,
      name,
    });

    return response.status(201).send();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export { specificationsRouter };
