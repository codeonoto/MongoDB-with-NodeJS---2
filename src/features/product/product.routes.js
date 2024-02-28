// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import ProductController from './product.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';

// 2. Initialize Express Router.
const productRouter = express.Router();

const productController = new ProductController();

// All the paths to controllers methods
// localhost/api/products
// for filter it will works as:
// localhost:3200/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.get('/filter', (req, res) => {
  productController.filterProducts(req, res);
});
productRouter.post('/rate', (req, res, next) => {
  productController.rateProduct(req, res, next);
});
productRouter.get('/', (req, res) => {
  productController.getAllProducts(req, res);
});
productRouter.post('/', upload.single('imageUrl'), (req, res) => {
  productController.addProduct(req, res);
});
productRouter.get('/averagePrice', (req, res) => {
  productController.averagePrice(req, res);
});
productRouter.get('/:id', (req, res) => {
  productController.getOneProduct(req, res);
});

export default productRouter;
