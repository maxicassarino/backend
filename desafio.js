class ProductManager {
    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products
    }

    addProduct( title, description, price, thumbnail, code, stock ){

        // Campos Obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        // Code no repetido
        const codeExistente = this.products.some(product => product.code === code);
        if (codeExistente) {
            console.error("El código del producto ya existe.");
            return;
        }

        const newProduct = {
            id: this.products.length + 1,
            title,
            description, 
            price, 
            thumbnail,
            code,
            stock
        }
        this.products.push(newProduct)
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            console.log(product);
        } else {
            console.error("Not Found");
        }
    }
}

const productManager = new ProductManager()
console.log(productManager.getProducts())
productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, "Sin imagen", "abc123", 25);
console.log(productManager.getProducts())
productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, "Sin imagen", "abc123", 25);
console.log(productManager.getProductById(1))