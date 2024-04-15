import productService from '../services/productsService.js';

const productsController = {};


productsController.getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


productsController.getProductById = async (req, res) => {
    try {
        // Obtiene el ID del producto del parámetro
        const { id } = req.params;
        const product = await productService.getProductById(id);
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


productsController.createProduct = async (req, res) => {
    try {
        // Obtiene los datos del nuevo producto del body
        const { title, category, price, stock } = req.body;
        const newProduct = await productService.createProduct(title, category, price, stock);
        res.json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


productsController.updateProductById = async (req, res) => {
    try {
        // Obtiene el ID del producto del parámetro
        const { id } = req.params;
        // Obtiene los datos del nuevo producto del body
        const product = req.body;
        const result = await productService.updateProductById(id, product);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


productsController.deleteProductById = async (req, res) => {
    try {
        // Obtiene el ID del producto del parámetro
        const { id } = req.params;
        const result = await productService.deleteProductById(id);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


export default productsController;