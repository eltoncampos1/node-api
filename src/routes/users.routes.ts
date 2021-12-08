import { Router } from 'express';
import ensureAuthenticated from 'modules/users/middlewares/ensureAuthenticated';
import { DeleteUserController } from 'modules/users/use-cases/delete-user/delete-user-controller';
import { ListUsersController } from 'modules/users/use-cases/list-users/list-users-controller';
import { UpdatePasswordController } from 'modules/users/use-cases/update-password/update-password-controller';
import { CreateUserController } from '../modules/users/use-cases/create-user/create-user-controller';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUsersController();
const updatePasswordController = new UpdatePasswordController();
const deleteUserController = new DeleteUserController();

usersRoutes.post('/create', createUserController.handle);
usersRoutes.get('/list', ensureAuthenticated, listUserController.handle);
usersRoutes.patch('/update/password', ensureAuthenticated, updatePasswordController.handle);
usersRoutes.delete('/delete', ensureAuthenticated, deleteUserController.handle);

export { usersRoutes };
