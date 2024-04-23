class Products {
    constructor() {
        this.data = [];
        this.nextId = 0;
    } 

    async get() {
        return this.data;
    }

    async getById(id) {
        return this.data.find(product => product.id === id);
    }

    async create(title, category, price, stock) {
        const newId = this.nextId++;
        const newProduct = { id: newId, title, category, price, stock };
        this.data.push(newProduct);
        return newProduct;
    }

    async update(id, product) {
        const index = this.data.findIndex(prod => prod.id === id);
        if (index !== -1) {
            this.data[index] = { ...product, id };
            return this.data[index];
        } else {
            throw new Error("Producto no encontrado");
        }
    }

    async delete(id) {
        const index = this.data.findIndex(prod => prod.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            return { message: "Producto eliminado exitosamente" };
        } else {
            throw new Error("Producto no encontrado");
        }
    }
}

export default Products;