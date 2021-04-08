import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carRouter = Router();

const createCarController = new CreateCarController();

carRouter.post(
  '/',
  ensureAuthenticated,
  accessControll,
  createCarController.handle
);

export { carRouter };
