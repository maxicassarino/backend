import productsModel from '../model/products.model.js';


const getProducts = async (req, res) => {
    try {
        let products = await productsModel.find();
        res.send({ result: "success", payload: products });
    } catch (error) {
        console.error("Error al obtener productos: ", error);
        res.status(500).json({ error: 'Error al obtener productos.' });
    }
};


const getProductById = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await productsModel.findOne({ _id: id });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al obtener producto por ID: ", error);
        res.status(500).json({ error: 'Error al obtener producto por ID.' });
    }
};


const createProduct = async (req, res) => {
    try {
        let { title, category, price, stock } = req.body;
        if (!title || !category || !price || !stock) {
            return res.status(400).json({ error: "Faltan datos." });
        }
        let result = await productsModel.create({ title, category, price, stock });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al agregar producto: ", error);
        res.status(500).json({ error: 'Error al agregar producto.' });
    }
};


const updateProductById = async (req, res) => {
    try {
        let { id } = req.params;
        let product = req.body;
        if (!product.title || !product.category || !product.price || !product.stock) {
            return res.status(400).json({ error: "Faltan datos." });
        }
        let result = await productsModel.updateOne({ _id: id }, product);
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al actualizar producto por ID: ", error);
        res.status(500).json({ error: 'Error al actualizar producto por ID.' });
    }
};


const deleteProductById = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await productsModel.deleteOne({ _id: id });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al eliminar producto por ID: ", error);
        res.status(500).json({ error: 'Error al eliminar producto por ID.' });
    }
};


export default {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
};