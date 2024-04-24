import express from 'express';
import productController from '../controllers/productsController.js';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// Endpoints

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getProductById);

router.post('/products', productController.createProduct);

router.put('/products/:id', productController.updateProduct);

router.delete('/products/:id', productController.deleteProduct);


export default router;