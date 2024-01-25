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

const productos = await lectura();


// Endpoints

router.get('/products', async (req, res) => {
    try {
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
        const productoId = req.params.id;
        let producto = listadoProductos.find((p) => p.id == productoId);
        if (producto) {
            return res.send(producto);
        } else {
            return res.send("Producto no encontrado.");
        }
    } catch (error) {
        console.error("Error al obtener producto por ID: ", error);
    }
});


router.post('/products', async (req, res) => {
    try {
        const nuevoProducto = req.body
        productos.push(nuevoProducto)
        res.json({message: "Producto agregado correctamente."})
    } catch (error) {
        console.error("Error al agregar producto: ", error);
    }
});


export default router