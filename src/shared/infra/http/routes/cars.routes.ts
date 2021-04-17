import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvaliableCarsController } from '@modules/cars/useCases/listCars/ListAvaliableCarsController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';

import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carRouter = Router();

const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const uploadImages = multer(uploadConfig.upload('./tmp/cars'));

carRouter.get('/available', listAvaliableCarsController.handle);

carRouter.use(ensureAuthenticated, accessControll);

carRouter.post('/', createCarController.handle);
carRouter.post(
  '/specifications/:car_id',
  createCarSpecificationController.handle
);

carRouter.post(
  '/images/:car_id',
  uploadImages.array('files'),
  uploadCarImageController.handle
);

export { carRouter };
