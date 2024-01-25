import express from 'express'

const router = express.Router()


router.use(express.json())
router.use(express.urlencoded({extended: true}))


const carrito = []

// Endpoints

router.get('/cart', async (req, res) => {
    try {
        return res.send(carrito);
    } catch (error) {
        console.error("Error al obtener productos del carrito: ", error);
    }
});

router.get('/cart/:id', async (req, res) => {
    try {
        const productoCarritoId = req.params.id;
        let producto = carrito.find((p) => p.id == productoCarritoId);
        if (producto) {
            return res.send(producto);
        } else {
            return res.send("Producto no encontrado en el carrito.");
        }
    } catch (error) {
        console.error("Error al obtener productos del carrito: ", error);
    }
});


router.post('/cart', async (req, res) => {
    try {
        const nuevoProducto = req.body
        let nuevoProductoCarrito = {id: carrito.length + 1, Producto: nuevoProducto};
        carrito.push(nuevoProductoCarrito)
        res.json({message: "Producto agregado correctamente al carrito."})
    } catch (error) {
        console.error("Error al agregar producto al carrito: ", error);
    }
});


export default router