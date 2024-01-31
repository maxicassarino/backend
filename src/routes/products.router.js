import express from 'express'
import ProductManager from '../ProductManager.js'; 

const router = express.Router()

const productManager = new ProductManager();

router.use(express.json())
router.use(express.urlencoded({extended: true}))


// Endpoints

router.get('/products', async (req, res) => {
    try {
        await productManager.iniciar();
        const productos = await productManager.getProducts();
        let limite = parseInt(req.query.limit);
        if (!isNaN(limite) && limite > 0) {
            const productosLimitados = productos.slice(0, limite);
            return res.json(productosLimitados);
        } else {
            return res.json(productos);
        }
    } catch (error) {
        console.error("Error al obtener productos: ", error);
    }
});


router.get('/products/:id', async (req, res) => {
    try {
        const productoId = parseInt(req.params.id);
        const producto = await productManager.getProductById(productoId);;
        if (producto) {
            return res.json(producto);
        } else {
            return res.status(404).json({ message: 'Producto no encontrado.'});
        }
    } catch (error) {
        console.error("Error al obtener producto por ID: ", error);
        res.status(500).json({ error: 'Error al obtener producto por ID.'});
    }
});


router.post('/products', async (req, res) => {
    try {
        const nuevoProducto = req.body;
        await productManager.addProduct(nuevoProducto);
        res.json({message: "Producto agregado correctamente."})
    } catch (error) {
        console.error("Error al agregar producto: ", error);
        res.status(500).json({ error: 'Error al agregar producto.' });
    }
});


router.put('/products/:id', async (req, res) => {
    try {
        const productoId = parseInt(req.params.id);
        await productManager.updateProduct(productoId, req.body);
        res.json({ message: 'Producto actualizado correctamente.'});
    } catch (error) {
        console.error("Error al obtener producto por ID: ", error);
        res.status(500).json({ error: 'Error al actualizar producto por ID.'});
    }
});


router.delete('/products/:id', async (req, res) => {
    try {
        const productoId = parseInt(req.params.id);
        await productManager.deleteProduct(productoId);
        res.json({ message: 'Producto eliminado correctamente.'});
    } catch (error) {
        console.error("Error al obtener producto por ID: ", error);
        res.status(500).json({ error: 'Error al eliminar producto por ID.'});
    }
});


export default router