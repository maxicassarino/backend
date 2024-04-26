class Cart {
    constructor() {
        this.data = [];
        this.nextId = 1;
    } 

    get = () => {
        return this.data;
    }

    getById = (id) => {
        const parsedId = parseInt(id);
        return this.data.find(cart => cart.id === parsedId);
    }

    create = (email) => {
        const newId = this.nextId++;
        const newCart = { id: newId, email: email, productos: [] };
        this.data.push(newCart);
        return newCart;
    }

    update = (cid, newProducts) => {
        const cart = this.getById(cid);
        if (cart) {
            // Combinar los productos existentes con los nuevos
            newProducts.forEach(newProduct => {
                const existingProductIndex = cart.productos.findIndex(product => product.id === newProduct.id);
                if (existingProductIndex !== -1) {
                    // Si el producto ya existe en el carrito, actualizar la cantidad
                    cart.productos[existingProductIndex].quantity += newProduct.quantity;
                } else {
                    // Si el producto no existe en el carrito, agregarlo
                    cart.productos.push(newProduct);
                }
            });
            return cart;
        } else {
            throw new Error("Carrito no encontrado");
        }
    }

    updateCartItemQuantity = (cartId, productId, quantity) => {
        const cart = this.getById(cartId);
        if (cart) {
            const productIndex = cart.productos.findIndex(item => item.id === productId);
            if (productIndex !== -1) {
                cart.productos[productIndex].quantity = quantity;
                return cart;
            } else {
                throw new Error("Producto no encontrado en el carrito");
            }
        } else {
            throw new Error("Carrito no encontrado");
        }
    }

    delete = (cartId) => {
        const index = this.data.findIndex(cart => cart.id === cartId);
        if (index !== -1) {
            this.data.splice(index, 1);
            return { message: "Carrito eliminado exitosamente" };
        } else {
            throw new Error("Carrito no encontrado");
        }
    }

    deleteCartItem = (cartId, productId) => {
        const cart = this.getById(cartId);
        if (cart) {
            const productIndex = cart.productos.findIndex(item => item.id === productId);
            if (productIndex !== -1) {
                cart.productos.splice(productIndex, 1);
                return cart;
            } else {
                throw new Error("Producto no encontrado en el carrito");
            }
        } else {
            throw new Error("Carrito no encontrado");
        }
    }
}

export default Cart;