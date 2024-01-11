class ProductManager {
    constructor(){
        this.products = []
        this.id = 0;
    }

    getProducts(){
        return this.products
    }

    addProduct(product){

        // Campos Obligatorios
        if (product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {
            // Codigo no repetido
            let found = this.products.find((p) => p.code === product.code);
            if (!found) {
                this.id++;
                product.id = this.id;
                this.products.push(product);
            } else {
                console.error("El codigo esta repetido.");
            }
        } else {
            console.error("Todos los campos son necesarios.");
        }
    }

    getProductById(id) {
        let product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error("Not Found");
        }
    }

    updateProduct(id, updatedData) {
        let index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            if (typeof updatedData === 'object' && updatedData !== null) {
                // Si updatedData es un objeto, actualizar campos individuales
                this.products[index] = {
                    ...this.products[index],
                    ...updatedData
                };
                console.log("Producto actualizado exitosamente.");
            } else {
                console.error("Los datos proporcionados para actualizar no son válidos.");
            }
        } else {
            console.error("Producto no encontrado para actualizar.");
        }
    }

    deleteProduct(id) {
        let index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            console.log("Producto eliminado exitosamente.");
        } else {
            console.error("Producto no encontrado para eliminar.");
        }
    }
}


const producto1 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
};

const producto2 = {
    title: 'producto prueba 2',
    description: 'Este es un producto prueba 2',
    price: 250,
    thumbnail: "Sin imagen",
    code: "abc124",
    stock: 20
};

const productManager = new ProductManager()
productManager.addProduct(producto1);
productManager.addProduct(producto2);
console.log(productManager.getProducts())

const producto1Nuevo = {
    title: 'producto prueba NUEVO',
};

productManager.updateProduct(1,producto1Nuevo);
console.log(productManager.getProducts())
productManager.deleteProduct(2)
console.log(productManager.getProducts())