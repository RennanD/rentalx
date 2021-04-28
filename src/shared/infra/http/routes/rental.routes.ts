import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRouter = Router();

const createRentalController = new CreateRentalController();

rentalRouter.use(ensureAuthenticated);

rentalRouter.post('/', createRentalController.handle);

export { rentalRouter };
