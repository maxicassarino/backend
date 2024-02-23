import fs from 'fs/promises';

class CartManager {
    constructor() {
        this.carts = [];
        this.path = 'src/json/carts.json';
    }

    async iniciar() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
            console.log("Archivo cart.json leido correctamente.")
        } catch (error) {
            console.error('Error al leer el archivo de carritos.', error);
        }
    }

    async escribir() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
            console.log('Datos de carritos guardados exitosamente.');
        } catch (error) {
            console.error('Error al escribir en el archivo de carritos.');
        }
    }

    async getCarts() {
        return this.carts;
    }

    getCartById(cartId) {
        const cart = this.carts.find((cart) => cart.id === cartId);

        if (cart) {
            return cart;
        } else {
            console.error('Carrito no encontrado.');
            return null;
        }
    }

    async createCart() {
        const maxId = Math.max(...this.carts.map(cart => cart.id), 0);
        const newId = maxId + 1;
        
        this.carts.push({"id": newId, "Productos": []});
        
        await this.escribir();
        console.log('Carrito creado exitosamente.');
    }

    async addToCart(cartId, productId, quantity) {
        const cartIndex = this.carts.findIndex((cart) => cart.id === cartId);

        if (cartIndex !== -1) {
            const productIndex = this.carts[cartIndex].Productos.findIndex((product) => product.Id === productId);

            if (productIndex !== -1) {
                // Si el producto ya existe en el carrito, se actualiza
                this.carts[cartIndex].Productos[productIndex].Quantity += quantity;
            } else {
                // Si el producto no existe en el carrito, se agrega
                this.carts[cartIndex].Productos.push({
                    "Id": productId,
                    "Quantity": quantity
                });
            }

            await this.escribir();
            console.log('Producto agregado al carrito exitosamente.');
        } else {
            console.error('Carrito no encontrado para agregar el producto.');
        }
    }

    async updateCart(cartId, updatedData) {
        const index = this.carts.findIndex((cart) => cart.id === cartId);
        if (index !== -1) {
            this.carts[index] = {
                ...this.carts[index],
                ...updatedData,
            };
            await this.escribir();
            console.log('Carrito actualizado exitosamente.');
        } else {
            console.error('Carrito no encontrado para actualizar.');
        }
    }

    async deleteCart(cartId) {
        const index = this.carts.findIndex((cart) => cart.id === cartId);
        if (index !== -1) {
            this.carts.splice(index, 1);
            await this.escribir();
            console.log('Carrito eliminado exitosamente.');
        } else {
            console.error('Carrito no encontrado para eliminar.');
        }
    }

    async clearCarts() {
        this.carts = [];
        await this.escribir();
        console.log('Lista de carritos vaciada exitosamente.');
    }
}

export default CartManager;