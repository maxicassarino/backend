import express from "express";
import ProductManager from '../ProductManager.js'; 

const router = express.Router()

const productManager = new ProductManager();

router.use(express.json())
router.use(express.urlencoded({extended: true}))


router.get('/home', async (req, res) => {
    try {
        await productManager.iniciar();
        const productos = await productManager.getProducts();
        res.render('layouts/home', {productos});
    } catch (error) {
        console.error('Error al obtener la lista de productos', error);
        res.status(500).send('Error interno del servidor');
    }
});

export default router