import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/creteSpecification';

const specificationsRouter = Router();

specificationsRouter.post('/', (request, response) => {
  return createSpecificationController.handle(request, response);
});

export { specificationsRouter };
