// 1. Import Express
// load all the environment variables in applicaion
import dotenv from 'dotenv';
dotenv.config();

// Core Imports
import express from 'express';
import swagger from 'swagger-ui-express';
import cors from 'cors';

// Router Imports
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cart/cartItems.routes.js';
import orderRouter from './src/features/order/order.routes.js';

// Export Imports
import bodyParser from 'body-parser';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import apiDocs from './swagger.json' assert { type: 'json' };
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import ApplicationError from './src/errorHandler/applicationError.js';
import { connectToMongoDB } from './src/config/mongodb.js';

// 2. Create a Server
const server = express();

// CORS policy configuration using "cors-lib"
server.use(cors());

server.use(bodyParser.json());

// for all requests related to product, redirect to product routes
// swaggerUI
server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
// Logger Middleware
server.use(loggerMiddleware);
// localhost:3200/api/products
server.use('/api/products', jwtAuth, productRouter);
// localhost:3200/api/users
server.use('/api/users', userRouter);
// localhost:3200/api/cart
server.use('/api/cart', jwtAuth, cartRouter);
// localhost:3200/api/order
server.use('/api/order', jwtAuth, orderRouter);

// 3. Defualt request handler
server.get('/', (req, res) => {
  res.send('Welcome to Ecommerce APIs');
});

// Error Handler Middleware
server.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message);
  }
  // server errors
  res.status(500).send('Something went wrong, Please try Later');
});

// 4. Middleware to handle 404 requests
server.use((req, res) => {
  res.status(404).send('API not found');
});

// 5. Specify Port.
const PORT = 3200;
server.listen(PORT, () => {
  console.log('Server is running at', PORT);
  connectToMongoDB();
});
