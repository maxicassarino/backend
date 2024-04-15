import cartService from '../services/cartService.js';

const cartController = {};

cartController.getCartItems = async (req, res) => {
    try {
        const cartItems = await cartService.getCartItems();
        res.json({ success: true, data: cartItems });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

cartController.getCartItemById = async (req, res) => {
    try {
        // Obtiene el ID del parámetro de la solicitud
        const { id } = req.params;
        const cartItem = await cartService.getCartItemById(id);
        res.json({ success: true, data: cartItem });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

cartController.createCart = async (req, res) => {
    try {
        const newCart = await cartService.createCart();
        res.json({ success: true, data: newCart });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

cartController.updateCart = async (req, res) => {
    try {
        // Obtiene el ID del carrito del parámetro 
        const { cid } = req.params;
        // Obtiene los nuevos productos del body
        const newProducts = req.body;
        const result = await cartService.updateCart(cid, newProducts);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

cartController.updateCartItemQuantity = async (req, res) => {
    try {
        // Obtiene los IDs del carrito y del producto de los parámetros 
        const { cid, pid } = req.params;
        // Obtiene la nueva cantidad del producto del body
        const { quantity } = req.body;
        const result = await cartService.updateCartItemQuantity(cid, pid, quantity);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

cartController.deleteCart = async (req, res) => {
    try {
        // Obtiene el ID del carrito del parámetro
        const { cid } = req.params;
        const result = await cartService.deleteCart(cid);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

cartController.deleteCartItem = async (req, res) => {
    try {
        // Obtiene los IDs del carrito y del producto de los parámetros
        const { cid, pid } = req.params;
        const result = await cartService.deleteCartItem(cid, pid);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export default cartController;