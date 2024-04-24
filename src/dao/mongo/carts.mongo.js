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
            const cart = await cartModel.findById(cartId);
            const existingProducts = cart.productos;
    
            // Actualizar la cantidad de productos existentes y agregar nuevos productos si no existen
            newProducts.forEach(newProduct => {
                const existingProductIndex = existingProducts.findIndex(product => product.id === newProduct.id);
                if (existingProductIndex !== -1) {
                    // Si el producto ya existe en el carrito, actualizar la cantidad
                    existingProducts[existingProductIndex].quantity += newProduct.quantity;
                } else {
                    // Si el producto no existe en el carrito, agregarlo
                    existingProducts.push(newProduct);
                }
            });
    
            // Actualizar el carrito con los productos combinados
            return await cartModel.updateOne({ _id: cartId }, { productos: existingProducts });
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