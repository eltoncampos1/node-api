import { Router } from 'express';
import { addressRoutes } from './addres.routes';
import { authenticateRoutes } from './authenticateUser.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/sessions', authenticateRoutes);
router.use('/address', addressRoutes);

export { router };
