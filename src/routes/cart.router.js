import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// Endpoints

router.get('/cart', cartController.getCart);

router.get('/cart/:id', cartController.getCartById);

router.post('/cart', cartController.createCart);

router.put('/cart/:id', cartController.updateCart);

router.put('/cart/:cid/:pid', cartController.updateCartItemQuantity);

router.delete('/cart/:id', cartController.deleteCart);

router.delete('/cart/:cid/:pid', cartController.deleteCartItem);

router.post('/cart/:cid/purchase', cartController.purchaseCart);


export default router;