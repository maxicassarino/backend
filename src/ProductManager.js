const fs = require("fs");

class ProductManager {
    constructor(filePath) {
        this.products = [];
        this.id = 0;
        this.path = filePath;
    }

    async iniciar() {
        try {
            // Leer datos del archivo y asignar a la lista de productos
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);

            // Encontrar el ID más alto para mantener la coherencia con el último ID asignado
            const maxId = Math.max(...this.products.map(product => product.id), 0);
            this.id = maxId;
        } catch (error) {
            console.error('Error al leer el archivo.');
        }
    }

    async escribir() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
            console.log('Datos guardados exitosamente.');
        } catch (error) {
            console.error('Error al escribir en el archivo.');
        }
    }

    async getProducts() {
        return this.products;
    }

    async addProduct(product) {
        if (product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {
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

const filePath = 'src/productos.json';
const productManager = new ProductManager(filePath);

(async () => {
    await productManager.iniciar();

    await productManager.addProduct({
        title: 'Zapatillas',
        description: 'Zapatillas blancas',
        price: 100,
        thumbnail: 'imagen.jpg',
        code: 'zapatilla01',
        stock: 5,
    });
    

    console.log(await productManager.getProducts());

})();