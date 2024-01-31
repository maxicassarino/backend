import fs from 'fs/promises';

class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
        this.path = 'src/productos.json';
    }

    async iniciar() {
        try {
            // Leer datos del archivo y asignar a la lista de productos
            const data = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            // Encontrar el ID más alto para mantener la coherencia con el último ID asignado
            const maxId = Math.max(...this.products.map(product => product.id), 0);
            this.id = maxId;
            console.log("Archivo productos.json leido correctamente.")
        } catch (error) {
            console.error('Error al leer el archivo.', error.message);
        }
    }

    async escribir() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
            console.log('Datos guardados exitosamente.');
        } catch (error) {
            console.error('Error al escribir en el archivo.');
        }
    }

    async getProducts() {
        return this.products;
    }

    async getProductById(id) {
        try {
            const product = this.products.find((product) => product.id === id);
            if (product) {
                return product;
            } else {
                console.error("Producto no encontrado con el ID proporcionado.");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener el producto por ID:", error.message);
            return null;
        }
    }

    async addProduct(product) {
        if (product.title && product.description && product.category && product.price && product.thumbnail && product.code && product.stock && product.status) {
            // Verificar código no duplicado
            let found = this.products.find((p) => p.code === product.code);
            if (!found) {
                // Mover el incremento de ID aquí
                this.id++;
                product.id = this.id;
                this.products.push(product);
                await this.escribir(); // Guardar cambios en el archivo
                console.log("Producto agregado exitosamente.");
            } else {
                console.error("El código está repetido. No se ha agregado el producto.");
            }
        } else {
            console.error("Todos los campos son necesarios.");
        }
    }

    async updateProduct(id, updatedData) {
        let index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            if (typeof updatedData === 'object' && updatedData !== null) {
                // Verificar que el nuevo código no exista en otros productos
                if (updatedData.code && this.products.some((p) => p.code === updatedData.code && p.id !== id)) {
                    console.error("El código está repetido.");
                } else {
                    // Actualizar campos individuales y guardar cambios
                    this.products[index] = {
                        ...this.products[index],
                        ...updatedData
                    };
                    await this.escribir();
                    console.log("Producto actualizado exitosamente.");
                }
            } else {
                console.error("Los datos proporcionados para actualizar no son válidos.");
            }
        } else {
            console.error("Producto no encontrado para actualizar.");
        }
    }

    async deleteProduct(id) {
        let index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            await this.escribir();
            console.log("Producto eliminado exitosamente.");
        } else {
            console.error("Producto no encontrado para eliminar.");
        }
    }
    
    clearProducts() {
        this.products = [];
        this.id = 0;
        this.escribir(); // Guardar cambios en el archivo al vaciar la lista
        console.log('Lista de productos vaciada exitosamente.');
    }
}

export default ProductManager;