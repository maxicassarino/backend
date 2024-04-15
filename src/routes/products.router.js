import express from 'express';
import productController from '../controllers/productsController.js';

const router = express.Router();

// Endpoints

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getProductById);

router.post('/products', productController.createProduct);

router.put('/products/:id', productController.updateProductById);

router.delete('/products/:id', productController.deleteProductById);

export default router;