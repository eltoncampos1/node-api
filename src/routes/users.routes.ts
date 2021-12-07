import { Router } from 'express';
import { ListUsersController } from 'modules/users/use-cases/list-users/list-users-controller';
import { CreateUserController } from '../modules/users/use-cases/create-user/create-user-controller';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUsersController();

usersRoutes.post('/create', createUserController.handle);
usersRoutes.get('/list', listUserController.handle);

export { usersRoutes };
