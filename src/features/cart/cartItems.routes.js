// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import CartItemsController from './cartItems.controller.js';

// 2. Initialize Express Router.
const cartRouter = express.Router();

const cartController = new CartItemsController();

cartRouter.post('/', cartController.add);
cartRouter.get('/', cartController.get);
cartRouter.delete('/:id', cartController.delete);

export default cartRouter;
 