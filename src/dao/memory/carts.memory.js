class Cart {
    constructor() {
        this.data = [];
        this.nextId = 0;
    } 

    get = () => {
        return this.data;
    }

    getById = (id) => {
        return this.data.find(cart => cart.id === id);
    }

    create = () => {
        const newId = this.nextId++;
        const newCart = { id: newId, productos: [] };
        this.data.push(newCart);
        return newCart;
    }

    update = (cartId, newProducts) => {
        const index = this.data.findIndex(cart => cart.id === cartId);
        if (index !== -1) {
            this.data[index].productos = newProducts;
            return this.data[index];
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