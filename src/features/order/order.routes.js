import express from 'express';
import OrderController from './order.controller.js';

const orderRouter = express.Router();

const orderController = new OrderController();

orderRouter.post('/', (req, res, next) => {
  orderController.placeOrder(req, res, next);
});

export default orderRouter;
