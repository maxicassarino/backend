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
        const carritoId = req.params.id;
        let usuario = carrito.find((p) => p.id == carritoId);
        if (usuario) {
            return res.send(usuario.Productos);
        } else {
            return res.send("Producto no encontrado en el carrito.");
        }
    } catch (error) {
        console.error("Error al obtener productos del carrito: ", error);
    }
});


router.post('/cart', async (req, res) => {
    try {
        const usuariosCarrito = {id: carrito.length + 1, Productos: []};
        carrito.push(usuariosCarrito)
        res.json({message: "Carrito creado correctamente."})
    } catch (error) {
        console.error("Error al crear carrito: ", error);
    }
});


router.post('/cart/:cid/:pid', async (req, res) => {
    try {
        const carritoId = req.params.cid;
        let productoID = req.params.pid
        let quantity = parseInt(req.body.quantity)
        let index = carrito.findIndex((u) => u.id == carritoId);
        if (index !== -1) {
            const usuario = carrito[index];
            const productoExistente = usuario.Productos.findIndex((p) => p.id == productoID);
            if (productoExistente !== -1) {
                usuario.Productos[productoExistente].quantity += quantity;
            } else {
                const nuevoProducto = { id: parseInt(productoID), quantity: quantity };
                usuario.Productos.push(nuevoProducto);
            }
            carrito[index] = usuario;
        } else {
            return res.send("ID no encontrado en el carrito.");
        }
    } catch (error) {
        console.error("Error al agregar producto al carrito: ", error);
    }
});


export default router