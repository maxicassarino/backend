import { Cart, Products, Tickets } from '../dao/factory.js';

const cartService = new Cart();
const productService = new Products();
const ticketService = new Tickets();


const cartController = {
    getCart: async (req, res) => {
        try {
            const result = await cartService.get();
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getCartById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await cartService.getById(id);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    createCart: async (req, res) => {
        try {
            const email = req.session.user.email
            const result = await cartService.create(email);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    updateCart: async (req, res) => {
        try {
            const { cid } = req.params;
            const newProducts = req.body;
            const result = await cartService.update(cid, newProducts);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    updateCartItemQuantity: async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const result = await cartService.updateCartItemQuantity(cid, pid, quantity);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    deleteCart: async (req, res) => {
        try {
            const { cid } = req.params;
            const result = await cartService.delete(cid);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    deleteCartItem: async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const result = await cartService.deleteCartItem(cid, pid);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    purchaseCart: async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await cartService.getById(cid);

            
            if (!cart) {
                return res.status(404).json({ success: false, error: "Carrito no encontrado" });
            }

            if (!cart.productos || cart.productos.length === 0) {
                return res.status(400).json({ success: false, error: "El carrito está vacío" });
            }

            const failedProducts = [];

            let totalPrice = 0;


            // Verificar el stock de cada producto en el carrito y realizar la compra
            for (const item of cart.productos) {
                const product = await productService.getById(item.id);
                if (!product) {
                    return res.status(404).json({ success: false, error: `Producto con ID ${item.id} no encontrado` });
                }
                if (product.stock >= item.quantity) {
                    // Si hay suficiente stock, restarlo del stock del producto
                    product.stock -= item.quantity;
                    await productService.update(item.id, product);
                    totalPrice += item.quantity * product.price
                } else {
                    // Si no hay suficiente stock, agregar el producto al arreglo de productos no comprados
                    failedProducts.push(item.id);
                }
            }


            // Crear un ticket con los productos comprados
            await ticketService.create(totalPrice, cart.email);


            if (failedProducts.length > 0) {
                // Actualizar el carrito para contener solo los productos no comprados
                const filteredProducts = cart.products.filter(item => !failedProducts.includes(item.productId));
                cart.products = filteredProducts;
                await cartService.update(cid, cart);
            } else {
                await cartService.delete(cid);
            }

            res.json({ success: true, message: "Compra realizada exitosamente", failedProducts });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};

export default cartController;