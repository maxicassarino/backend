import express from 'express';
import Cart from '../dao/mongo/carts.mongo.js';
// import Cart from '../dao/memory/carts.memory.js';

const router = express.Router()


router.use(express.json())
router.use(express.urlencoded({extended: true}))

const cartService = new Cart()


// Endpoints

router.get('/cart', async (req, res) => {
    const result = await cartService.get();
    res.json({ success: true, data: result });
});


router.get('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await cartService.getById(id);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.post('/cart', async (req, res) => {
    try {
        const result = await cartService.create();
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.put('/cart/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const newProducts = req.body;
        const result = await cartService.update(cid, newProducts);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.put('/cart/:cid/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const result = await cartService.updateCartItemQuantity(cid, pid, quantity);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.delete('/cart/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await cartService.delete(cid);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.delete('/cart/:cid/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await cartService.deleteCartItem(cid, pid);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


export default router;