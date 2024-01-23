import express from 'express'
import fs from "fs/promises";

const router = express.Router()


router.use(express.json())
router.use(express.urlencoded({extended: true}))

const filePath = 'src/productos.json';

const lectura = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error de lectura: ", error);
        return [];
    }
};


router.get('/products', async (req, res) => {
    try {
        const productos = await lectura();
        let limite = parseInt(req.query.limit);
        if (!isNaN(limite) && limite > 0) {
            const productosLimitados = productos.slice(0, limite);
            return res.send(productosLimitados);
        } else {
            return res.send(productos);
        }
    } catch (error) {
        console.error("Error al obtener productos: ", error);
    }
});


router.get('/products/:id', async (req, res) => {
    try {
        const productos = await lectura();
        const productoId = req.params.id;
        let producto = productos.find((p) => p.id == productoId);
        if (producto) {
            return res.send(producto);
        } else {
            return res.send("Producto no encontrado.");
        }
    } catch (error) {
        console.error("Error al obtener producto por ID: ", error);
    }
});

export default router