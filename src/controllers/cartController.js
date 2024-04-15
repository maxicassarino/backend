import cartsModel from '../model/cart.model.js';


const getCartItems = async (req, res) => {
    try {
        let carts = await cartsModel.find();
        res.send({ result: "success", payload: carts });
    } catch (error) {
        console.error("Error al obtener productos del carrito: ", error);
        res.status(500).json({ error: 'Error al obtener carritos.' });
    }
};


const getCartItemById = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await cartsModel.findOne({ _id: id });
        res.send({ result: "success", payload: result.productos });
    } catch (error) {
        console.error("Error al obtener productos del carrito: ", error);
        res.status(500).json({ error: 'Error al obtener productos del carrito.' });
    }
};


const createCart = async (req, res) => {
    try {
        let result = await cartsModel.create({});
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al crear carrito: ", error);
        res.status(500).json({ error: 'Error al crear carrito.' });
    }
};


const updateCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const newProducts = req.body;
        if (!cid || !newProducts || !Array.isArray(newProducts)) {
            return res.status(400).json({ error: "Los datos proporcionados son incorrectos." });
        }
        const result = await cartsModel.updateOne({ _id: cid }, { productos: newProducts });
        res.json({ status: "success", payload: result });
    } catch (error) {
        console.error("Error al actualizar el carrito de compras: ", error);
        res.status(500).json({ error: 'Error al actualizar el carrito de compras.' });
    }
};


const updateCartItemQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        if (!cid || !pid || !quantity) {
            return res.status(400).json({ error: "Faltan datos." });
        }
        // Verificar si el carrito existe
        const cart = await cartsModel.findOne({ _id: cid });
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado." });
        }
        // Encontrar el índice del producto en el carrito
        const productIndex = cart.productos.findIndex(item => item.id === pid);
        if (productIndex === -1) {
            return res.status(404).json({ error: "Producto no encontrado en el carrito." });
        }
        // Actualizar la cantidad del producto en el carrito
        cart.productos[productIndex].quantity = quantity;
        // Guardar los cambios en la base de datos
        let result = await cartsModel.updateOne({ _id: cid }, { productos: cart.productos });
        res.json({ status: "success", payload: result });
    } catch (error) {
        console.error("Error al actualizar la cantidad del producto en el carrito: ", error);
        res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito.' });
    }
};


const deleteCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsModel.findOne({ _id: cid });
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado.' });
        }
        // Eliminar todos los productos del carrito
        cart.productos = [];
        // Guardar los cambios en la base de datos
        let result = await cartsModel.updateOne({ _id: cid }, {productos: cart.productos });
        res.json({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al eliminar todos los productos del carrito: ", error);
        res.status(500).json({ error: 'Error al eliminar todos los productos del carrito.' });
    }
};


const deleteCartItem = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsModel.findOne({ _id: cid });
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado.' });
        }
        // Verificar si el producto existe en el carrito
        const productIndex = cart.productos.findIndex(item => item.id === pid);
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Producto no encontrado en el carrito.' });
        }
        // Eliminar el producto del carrito
        cart.productos.splice(productIndex, 1);
        // Guardar los cambios en la base de datos
        let result = await cartsModel.updateOne({ _id: cid }, {productos: cart.productos });
        res.send({result: "success", payload: result})
    } catch (error) {
        console.error("Error al eliminar producto del carrito: ", error);
        res.status(500).json({ error: 'Error al eliminar producto del carrito.'});
    }
};


export default {
    getCartItems,
    getCartItemById,
    createCart,
    updateCart,
    updateCartItemQuantity,
    deleteCart,
    deleteCartItem
};