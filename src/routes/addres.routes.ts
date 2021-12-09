import { Router } from 'express';
import { CreateAddressController } from 'modules/address/use-cases/create-address/create-address-controller';
import { DeleteAddressController } from 'modules/address/use-cases/delete-address/delete-address-controller';
import { ListUserAddressControler } from 'modules/address/use-cases/list-user-address/list-user-address-controller';
import ensureAuthenticated from 'modules/users/middlewares/ensureAuthenticated';

const addressRoutes = Router();
const createAddressController = new CreateAddressController();
const listUserAddressController = new ListUserAddressControler();
const deleteAddressController = new DeleteAddressController();

addressRoutes.post('/create', ensureAuthenticated, createAddressController.handle);
addressRoutes.get('/', ensureAuthenticated, listUserAddressController.handle);
addressRoutes.delete('/delete', ensureAuthenticated, deleteAddressController.handle);

export { addressRoutes };
