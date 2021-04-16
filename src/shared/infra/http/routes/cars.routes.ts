import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvaliableCarsController } from '@modules/cars/useCases/listCars/ListAvaliableCarsController';

import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carRouter = Router();

const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carRouter.get('/available', listAvaliableCarsController.handle);

carRouter.use(ensureAuthenticated, accessControll);

carRouter.post('/', createCarController.handle);
carRouter.post(
  '/specifications/:car_id',
  createCarSpecificationController.handle
);

export { carRouter };
