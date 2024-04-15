import productsModel from '../model/products.model.js';

const productService = {};

productService.getProducts = async () => {
    try {
        return await productsModel.find();
    } catch (error) {
        throw new Error("Error al obtener productos");
    }
};

productService.getProductById = async (id) => {
    try {
        return await productsModel.findById(id);
    } catch (error) {
        throw new Error("Error al obtener producto por ID");
    }
};

productService.createProduct = async (title, category, price, stock) => {
    try {
        return await productsModel.create({ title, category, price, stock });
    } catch (error) {
        throw new Error("Error al agregar producto");
    }
};

productService.updateProductById = async (id, product) => {
    try {
        return await productsModel.updateOne({ _id: id }, product);
    } catch (error) {
        throw new Error("Error al actualizar producto por ID");
    }
};

productService.deleteProductById = async (id) => {
    try {
        return await productsModel.deleteOne({ _id: id });
    } catch (error) {
        throw new Error("Error al eliminar producto por ID");
    }
};

export default productService;