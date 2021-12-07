import { Router } from 'express';
import { AuthenticateUserController } from 'modules/users/use-cases/authenticate-user/authenticate-user-controller';

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post('/', authenticateUserController.handle);

export { authenticateRoutes };
