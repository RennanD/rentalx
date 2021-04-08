import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/creteSpecification/CreateSpecificationController';

import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();

// Auth admin routes
specificationsRouter.use(ensureAuthenticated);
specificationsRouter.use(accessControll);

specificationsRouter.post('/', createSpecificationController.handle);

export { specificationsRouter };
