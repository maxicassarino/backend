import express from 'express';
import { Products } from '../dao/factory.js';

const router = express.Router();


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const productService = new Products(); 


// Endpoints 

router.get('/products', async (req, res) => {
    try {
        const products = await productService.get();
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getById(id);
        if (!product) {
            res.status(404).json({ success: false, error: "Producto no encontrado" });
        } else {
            res.json({ success: true, data: product });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.post('/products', async (req, res) => {
    try {
        const { title, category, price, stock } = req.body;
        const newProduct = await productService.create(title, category, price, stock);
        res.json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productUpdates = req.body;
        const updatedProduct = await productService.update(id, productUpdates);
        if (!updatedProduct) {
            res.status(404).json({ success: false, error: "Producto no encontrado" });
        } else {
            res.json({ success: true, data: updatedProduct });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await productService.delete(id);
        if (!result) {
            res.status(404).json({ success: false, error: "Producto no encontrado" });
        } else {
            res.json({ success: true, message: "Producto eliminado exitosamente" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


export default router;