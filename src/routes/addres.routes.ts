import { Router } from 'express';
import { CreateAddressController } from 'modules/address/use-cases/create-address/create-address-controller';
import { DeleteAddressController } from 'modules/address/use-cases/delete-address/delete-address-controller';
import { ListUserAddressControler } from 'modules/address/use-cases/list-user-address/list-user-address-controller';
import { UpdateAddressController } from 'modules/address/use-cases/update-address/update-adress-controller';
import ensureAuthenticated from 'modules/users/middlewares/ensureAuthenticated';

const addressRoutes = Router();
const createAddressController = new CreateAddressController();
const listUserAddressController = new ListUserAddressControler();
const deleteAddressController = new DeleteAddressController();
const updateAddressController = new UpdateAddressController();

addressRoutes.post('/create', ensureAuthenticated, createAddressController.handle);
addressRoutes.get('/', ensureAuthenticated, listUserAddressController.handle);
addressRoutes.patch('/delete', ensureAuthenticated, deleteAddressController.handle);
addressRoutes.patch('/update', ensureAuthenticated, updateAddressController.handle);

export { addressRoutes };
