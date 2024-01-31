import fs from 'fs/promises';

class CartManager {
    constructor() {
        this.carts = [];
        this.path = 'src/carts.json';
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

    async addCart(cart) {
        this.carts.push(cart);
        await this.escribir();
        console.log('Carrito agregado exitosamente.');
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