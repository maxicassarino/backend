import express from 'express'
// import ProductManager from '../manager/ProductManager.js'; 
import productsModel from '../model/products.model.js';

const router = express.Router()

// const productManager = new ProductManager();

router.use(express.json())
router.use(express.urlencoded({extended: true}))


// Endpoints

// router.get('/products', async (req, res) => {
//     try {
//         await productManager.iniciar();
//         const productos = await productManager.getProducts();
//         let limite = parseInt(req.query.limit);
//         if (!isNaN(limite) && limite > 0) {
//             const productosLimitados = productos.slice(0, limite);
//             return res.json(productosLimitados);
//         } else {
//             return res.json(productos);
//         }
//     } catch (error) {
//         console.error("Error al obtener productos: ", error);
//     }
// });

router.get('/products', async (req, res) => {
    try {
        let products = await productsModel.find();
        res.send({result: "success", payload: products})
    } catch (error) {
        console.error("Error al obtener productos: ", error);
    }
});


// router.get('/products/:id', async (req, res) => {
//     try {
//         const productoId = parseInt(req.params.id);
//         const producto = await productManager.getProductById(productoId);;
//         if (producto) {
//             return res.json(producto);
//         } else {
//             return res.status(404).json({ message: 'Producto no encontrado.'});
//         }
//     } catch (error) {
//         console.error("Error al obtener producto por ID: ", error);
//         res.status(500).json({ error: 'Error al obtener producto por ID.'});
//     }
// });


router.get('/products/:id', async (req, res) => {
    try {
        let {id} = req.params
        let result = await productsModel.findOne({_id: id})
        res.send({result: "success", payload: result})
    } catch (error) {
        console.error("Error al obtener producto por ID: ", error);
        res.status(500).json({ error: 'Error al obtener producto por ID.'});
    }
});


// router.post('/products', async (req, res) => {
//     try {
//         await productManager.iniciar();
//         const nuevoProducto = req.body;
//         await productManager.addProduct(nuevoProducto);
//         res.json({message: "Producto agregado correctamente."})
//     } catch (error) {
//         console.error("Error al agregar producto: ", error);
//         res.status(500).json({ error: 'Error al agregar producto.' });
//     }
// });


router.post('/products', async (req, res) => {
    try {
        let {title, price, stock} = req.body
        if (!title || !price || !stock) {
            res.send({status: " Error", error: "Faltan datos"})
        } 
        let result = await productsModel.create({title, price, stock})
        res.send({result: "success", payload: result})
    } catch (error) {
        console.error("Error al agregar producto: ", error);
        res.status(500).json({ error: 'Error al agregar producto.' });
    }
});


// router.put('/products/:id', async (req, res) => {
//     try {
//         const productoId = parseInt(req.params.id);
//         await productManager.updateProduct(productoId, req.body);
//         res.json({ message: 'Producto actualizado correctamente.'});
//     } catch (error) {
//         console.error("Error al actualizar producto por ID: ", error);
//         res.status(500).json({ error: 'Error al actualizar producto por ID.'});
//     }
// });


router.put('/products/:id', async (req, res) => {
    try {
        let {id} = req.params
        let product = req.body
        if (!product.title || !product.price || !product.stock) {
            res.send({status: " Error", error: "Faltan datos"})
        } 
        let result = await productsModel.updateOne({_id: id}, product)
        res.send({result: "success", payload: result})
    } catch (error) {
        console.error("Error al actualizar producto por ID: ", error);
        res.status(500).json({ error: 'Error al actualizar producto por ID.'});
    }
});


// router.delete('/products/:id', async (req, res) => {
//     try {
//         const productoId = parseInt(req.params.id);
//         await productManager.deleteProduct(productoId);
//         res.json({ message: 'Producto eliminado correctamente.'});
//     } catch (error) {
//         console.error("Error al obtener producto por ID: ", error);
//         res.status(500).json({ error: 'Error al eliminar producto por ID.'});
//     }
// });


router.delete('/products/:id', async (req, res) => {
    try {
        let {id} = req.params
        let result = await productsModel.deleteOne({_id: id})
        res.send({result: "success", payload: result})
    } catch (error) {
        console.error("Error al eliminar producto por ID: ", error);
        res.status(500).json({ error: 'Error al eliminar producto por ID.'});
    }
});


export default router