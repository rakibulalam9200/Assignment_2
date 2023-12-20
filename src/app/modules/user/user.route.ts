import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getSingleUser);
router.delete('/:userId', UserController.deleteUser);
router.put('/:userId/orders', UserController.createOrderForUser);
router.get('/:userId/orders', UserController.getAllOrdersForUser);
router.get(
  '/:userId/orders/total-price',
  UserController.getAllOrdersTotalPriceForSingleUser,
);

export const UserRoutes = router;
