import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router()


router.use(express.json())
router.use(express.urlencoded({extended: true}))


// Endpoints

router.get('/cart', cartController.getCartItems);

router.get('/cart/:id', cartController.getCartItemById);

router.post('/cart', cartController.createCart);

router.put('/cart/:cid', cartController.updateCart);

router.put('/cart/:cid/:pid', cartController.updateCartItemQuantity);

router.delete('/cart/:cid', cartController.deleteCart);

router.delete('/cart/:cid/:pid', cartController.deleteCartItem);


export default router