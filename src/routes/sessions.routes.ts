import { Router } from 'express';

import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateSession/AuthenticateUserController';

const sessionsRouter = Router();

const authenticateUserController = new AuthenticateUserController();

sessionsRouter.post('/sessions', authenticateUserController.handle);

export { sessionsRouter };
