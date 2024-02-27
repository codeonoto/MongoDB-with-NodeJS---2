// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import CartItemsController from './cartItems.controller.js';

// 2. Initialize Express Router.
const cartRouter = express.Router();

const cartController = new CartItemsController();

cartRouter.post('/', (req, res, next) => {
  cartController.add(req, res, next);
});
cartRouter.get('/', (req, res, next) => {
  cartController.get(req, res, next);
});
cartRouter.delete('/:id', (req, res, next) => {
  cartController.delete(req, res, next);
});

export default cartRouter;
