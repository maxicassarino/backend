import cartsModel from '../model/cart.model.js';

const cartService = {};

cartService.getCartItems = async () => {
    try {
        return await cartsModel.find();
    } catch (error) {
        throw new Error("Error al obtener productos del carrito");
    }
};

cartService.getCartItemById = async (id) => {
    try {
        return await cartsModel.findById(id);
    } catch (error) {
        throw new Error("Error al obtener producto del carrito por ID");
    }
};

cartService.createCart = async () => {
    try {
        return await cartsModel.create({});
    } catch (error) {
        throw new Error("Error al crear carrito");
    }
};

cartService.updateCart = async (cartId, newProducts) => {
    try {
        return await cartsModel.updateOne({ _id: cartId }, { productos: newProducts });
    } catch (error) {
        throw new Error("Error al actualizar el carrito de compras");
    }
};

cartService.updateCartItemQuantity = async (cartId, productId, quantity) => {
    try {
        const cart = await cartsModel.findById(cartId);
        // Encuentra el índice del producto en el carrito
        const productIndex = cart.productos.findIndex(item => item.id === productId);
        if (productIndex === -1) {
            // Si el producto no está en el carrito, lanza un error
            throw new Error("Producto no encontrado en el carrito");
        }
        // Actualiza la cantidad del producto en el carrito
        cart.productos[productIndex].quantity = quantity;
        return await cartsModel.updateOne({ _id: cartId }, { productos: cart.productos });
    } catch (error) {
        throw new Error("Error al actualizar la cantidad del producto en el carrito");
    }
};

cartService.deleteCart = async (cartId) => {
    try {
        return await cartsModel.deleteOne({ _id: cartId });
    } catch (error) {
        throw new Error("Error al eliminar carrito");
    }
};

cartService.deleteCartItem = async (cartId, productId) => {
    try {
        const cart = await cartsModel.findById(cartId);
        // Encuentra el índice del producto en el carrito
        const productIndex = cart.productos.findIndex(item => item.id === productId);
        if (productIndex === -1) {
            // Si el producto no está en el carrito, lanza un error
            throw new Error("Producto no encontrado en el carrito");
        }
        // Elimina el producto del carrito
        cart.productos.splice(productIndex, 1);
        return await cartsModel.updateOne({ _id: cartId }, { productos: cart.productos });
    } catch (error) {
        throw new Error("Error al eliminar producto del carrito");
    }
};

export default cartService;