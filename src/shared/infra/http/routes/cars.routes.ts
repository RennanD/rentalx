import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvaliableCarsController } from '@modules/cars/useCases/listCars/ListAvaliableCarsController';

import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carRouter = Router();

const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();

carRouter.get('/available', listAvaliableCarsController.handle);

carRouter.post(
  '/',
  ensureAuthenticated,
  accessControll,
  createCarController.handle
);

export { carRouter };
