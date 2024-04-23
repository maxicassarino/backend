import cartModel from '../../model/cart.model.js'

class Cart {
    constructor() {} 

    get = async() => {
        try {
            return await cartModel.find();
        } catch (error) {
            throw new Error("Error al obtener productos del carrito.");
        }
    }

    getById = async (id) => {
        try {
            return await cartModel.findById(id);
        } catch (error) {
            throw new Error("Error al obtener producto del carrito por ID");
        }
    }

    create = async () => {
        try {
            return await cartModel.create({});
        } catch (error) {
            throw new Error("Error al crear carrito");
        }
    }

    update = async (cartId, newProducts) => {
        try {
            return await cartModel.updateOne({ _id: cartId }, { productos: newProducts });
        } catch (error) {
            throw new Error("Error al actualizar el carrito de compras");
        }
    }

    updateCartItemQuantity = async (cartId, productId, quantity) => {
        try {
            const cart = await cartModel.findById(cartId);
            // Encuentra el índice del producto en el carrito
            const productIndex = cart.productos.findIndex(item => item.id === productId);
            if (productIndex === -1) {
                // Si el producto no está en el carrito, lanza un error
                throw new Error("Producto no encontrado en el carrito");
            }
            // Actualiza la cantidad del producto en el carrito
            cart.productos[productIndex].quantity = quantity;
            return await cartModel.updateOne({ _id: cartId }, { productos: cart.productos });
        } catch (error) {
            throw new Error("Error al actualizar la cantidad del producto en el carrito");
        }
    }

    delete = async (cartId) => {
        try {
            return await cartModel.deleteOne({ _id: cartId });
        } catch (error) {
            throw new Error("Error al eliminar carrito");
        }
    }

    deleteCartItem = async (cartId, productId) => {
        try {
            const cart = await cartModel.findById(cartId);
            // Encuentra el índice del producto en el carrito
            const productIndex = cart.productos.findIndex(item => item.id === productId);
            if (productIndex === -1) {
                // Si el producto no está en el carrito, lanza un error
                throw new Error("Producto no encontrado en el carrito");
            }
            // Elimina el producto del carrito
            cart.productos.splice(productIndex, 1);
            return await cartModel.updateOne({ _id: cartId }, { productos: cart.productos });
        } catch (error) {
            throw new Error("Error al eliminar producto del carrito");
        }
    }
}

export default Cart;