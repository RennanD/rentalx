import { Router } from 'express';

import { carRouter } from './cars.routes';
import { categoriesRouter } from './categories.routes';
import { rentalRouter } from './rental.routes';
import { sessionsRouter } from './sessions.routes';
import { specificationsRouter } from './specifications.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/specifications', specificationsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', sessionsRouter);
routes.use('/cars', carRouter);
routes.use('/rentals', rentalRouter);

export { routes };
