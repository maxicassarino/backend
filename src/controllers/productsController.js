import { Products } from '../dao/factory.js';
import CustomError from '../services/errors/CustomError.js';
import EErrors from "../services/errors/enums.js";
import { generateProductErrorInfo } from '../services/errors/info.js'

const productService = new Products();

const productController = {
    getProducts: async (req, res) => {
        try {
            const products = await productService.get();
            res.json({ success: true, data: products });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await productService.getById(id);
            if (!product) {
                res.status(404).json({ success: false, error: "Producto no encontrado" });
            } else {
                res.json({ success: true, data: product });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    createProduct: async (req, res) => {
        try {
            const { title, category, price, stock } = req.body;
            if (!title || !category || !price || !stock) {
                CustomError.createError({
                    name: "Error en el registro de producto",
                    cause: generateProductErrorInfo({ title, category, price, stock }),
                    message: "Falta de datos",
                    code: EErrors.INVALID_TYPES_PRODUCTERROR
                })
            }
            const newProduct = await productService.create(title, category, price, stock);
            res.json({ success: true, data: newProduct });
        } catch (error) {
            res.status(500).json({ name: error.name, error: error.message , code: error.code, cause: error.cause});
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const productUpdates = req.body;
            const updatedProduct = await productService.update(id, productUpdates);
            if (!updatedProduct) {
                res.status(404).json({ success: false, error: "Producto no encontrado" });
            } else {
                res.json({ success: true, data: updatedProduct });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await productService.delete(id);
            if (!result) {
                res.status(404).json({ success: false, error: "Producto no encontrado" });
            } else {
                res.json({ success: true, message: "Producto eliminado exitosamente" });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};

export default productController;