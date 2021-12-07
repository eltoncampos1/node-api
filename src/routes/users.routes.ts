import { Router } from 'express';
import { CreateUserController } from '../modules/users/use-cases/create-user/create-user-controller';

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post('/create', createUserController.handle);

export { usersRoutes };
