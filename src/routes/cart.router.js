import express from 'express'
import CartManager from '../CartManager.js';

const router = express.Router()

const cartManager = new CartManager();


router.use(express.json())
router.use(express.urlencoded({extended: true}))


// Endpoints

router.get('/cart', async (req, res) => {
    try {
        await cartManager.iniciar();
        const carts = await cartManager.getCarts();
        res.json(carts);
    } catch (error) {
        console.error("Error al obtener productos del carrito: ", error);
        res.status(500).json({ error: 'Error al obtener carritos.' });
    }
});


router.get('/cart/:id', async (req, res) => {
    try {
        const cartId = parseInt(req.params.id);
        const cart = await cartManager.getCartById(cartId);
        if (cart) {
            res.json(cart.Productos);
        } else {
            res.status(404).json({ message: 'Productos no encontrados.' });
        }
    } catch (error) {
        console.error("Error al obtener productos del carrito: ", error);
        res.status(500).json({ error: 'Error al obtener productos del carrito.'});
    }
});


router.post('/cart', async (req, res) => {
    try {
        await cartManager.iniciar();
        await cartManager.createCart();
        res.json({message: "Carrito creado exitosamente."});
    } catch (error) {
        console.error("Error al crear carrito: ", error);
        res.status(500).json({ error: 'Error al crear carrito.' });
    }
});


router.post('/cart/:cid/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const quantity = parseInt(req.body.quantity);
        await cartManager.addToCart(cartId, productId, quantity);
    } catch (error) {
        console.error("Error al agregar producto al carrito: ", error);
        res.status(500).json({ error: 'Error al agregar producto al carrito.'});
    }
});


export default router