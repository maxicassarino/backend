import productsModel from '../../model/products.model.js'

class Products {
    constructor() {} 

    async get() {
        try {
            return await productsModel.find();
        } catch (error) {
            throw new Error("Error al obtener productos");
        }
    }

    async getById(id) {
        try {
            return await productsModel.findById(id);
        } catch (error) {
            throw new Error("Error al obtener producto por ID");
        }
    }

    async create(title, category, price, stock) {
        try {
            return await productsModel.create({ title, category, price, stock });
        } catch (error) {
            throw new Error("Error al agregar producto");
        }
    }

    async update(id, product) {
        try {
            return await productsModel.updateOne({ _id: id }, product);
        } catch (error) {
            throw new Error("Error al actualizar producto por ID");
        }
    }

    async delete(id) {
        try {
            return await productsModel.deleteOne({ _id: id });
        } catch (error) {
            throw new Error("Error al eliminar producto por ID");
        }
    }
}

export default Products;