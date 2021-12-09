import { Router } from 'express';
import { CreateAddressController } from 'modules/address/use-cases/create-address/create-address-controller';
import ensureAuthenticated from 'modules/users/middlewares/ensureAuthenticated';

const addressRoutes = Router();
const createAddressController = new CreateAddressController();

addressRoutes.post('/create', ensureAuthenticated, createAddressController.handle);

export { addressRoutes };
