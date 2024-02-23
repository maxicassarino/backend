import express from 'express'
// import CartManager from '../manager/CartManager.js';
import cartsModel from '../model/cart.model.js';

const router = express.Router()

// const cartManager = new CartManager();

router.use(express.json())
router.use(express.urlencoded({extended: true}))


// Endpoints

// router.get('/cart', async (req, res) => {
//     try {
//         await cartManager.iniciar();
//         const carts = await cartManager.getCarts();
//         res.json(carts);
//     } catch (error) {
//         console.error("Error al obtener productos del carrito: ", error);
//         res.status(500).json({ error: 'Error al obtener carritos.' });
//     }
// });


router.get('/cart', async (req, res) => {
    try {
        let carts = await cartsModel.find();
        res.send({result: "success", payload: carts})
    } catch (error) {
        console.error("Error al obtener productos del carrito: ", error);
        res.status(500).json({ error: 'Error al obtener carritos.' });
    }
});


// router.get('/cart/:id', async (req, res) => {
//     try {
//         const cartId = parseInt(req.params.id);
//         const cart = await cartManager.getCartById(cartId);
//         if (cart) {
//             res.json(cart.Productos);
//         } else {
//             res.status(404).json({ message: 'Productos no encontrados.' });
//         }
//     } catch (error) {
//         console.error("Error al obtener productos del carrito: ", error);
//         res.status(500).json({ error: 'Error al obtener productos del carrito.'});
//     }
// });


router.get('/cart/:id', async (req, res) => {
    try {
        let {id} = req.params
        let result = await cartsModel.findOne({_id: id})
        res.send({result: "success", payload: result.productos})
    } catch (error) {
        console.error("Error al obtener productos del carrito: ", error);
        res.status(500).json({ error: 'Error al obtener productos del carrito.'});
    }
});


// router.post('/cart', async (req, res) => {
//     try {
//         await cartManager.iniciar();
//         await cartManager.createCart();
//         res.json({message: "Carrito creado exitosamente."});
//     } catch (error) {
//         console.error("Error al crear carrito: ", error);
//         res.status(500).json({ error: 'Error al crear carrito.' });
//     }
// });


router.post('/cart', async (req, res) => {
    try {
        let result = await cartsModel.create({})
        res.send({result: "success", payload: result})
    } catch (error) {
        console.error("Error al crear carrito: ", error);
        res.status(500).json({ error: 'Error al crear carrito.' });
    }
});


// router.post('/cart/:cid/:pid', async (req, res) => {
//     try {
//         const cartId = parseInt(req.params.cid);
//         const productId = parseInt(req.params.pid);
//         const quantity = parseInt(req.body.quantity);
//         await cartManager.addToCart(cartId, productId, quantity);
//     } catch (error) {
//         console.error("Error al agregar producto al carrito: ", error);
//         res.status(500).json({ error: 'Error al agregar producto al carrito.'});
//     }
// });


router.post('/cart/:cid/:pid', async (req, res) => {
    try {
        let {cid, pid} = req.params
        let product = req.body
        if (!cid || !pid || !product.quantity) {
            res.send({status: " Error", error: "Faltan datos"})
        } 
        // Verificar si el producto ya está en el carrito del cliente
        const cart = await cartsModel.findOne({ _id: cid });
        const productoExistente = cart.productos.findIndex(item => item.id === pid);
        // Actualizar la cantidad si el producto ya está en el carrito
        if (productoExistente !== -1) {
            cart.productos[productoExistente].quantity += product.quantity;
        } else {
            // Agregar el producto al carrito si no está presente
            cart.productos.push({id: pid, quantity: product.quantity });
        }
        let result = await cartsModel.updateOne({ _id: cid }, {productos: cart.productos });
        res.send({result: "success", payload: result})
    } catch (error) {
        console.error("Error al agregar producto al carrito: ", error);
        res.status(500).json({ error: 'Error al agregar producto al carrito.'});
    }
});


export default router