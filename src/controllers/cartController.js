import { Cart } from '../dao/factory.js';

const cartService = new Cart();

const cartController = {
    getCart: async (req, res) => {
        try {
            const result = await cartService.get();
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getCartById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await cartService.getById(id);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    createCart: async (req, res) => {
        try {
            const result = await cartService.create();
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    updateCart: async (req, res) => {
        try {
            const { cid } = req.params;
            const newProducts = req.body;
            const result = await cartService.update(cid, newProducts);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    updateCartItemQuantity: async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const result = await cartService.updateCartItemQuantity(cid, pid, quantity);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    deleteCart: async (req, res) => {
        try {
            const { cid } = req.params;
            const result = await cartService.delete(cid);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    deleteCartItem: async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const result = await cartService.deleteCartItem(cid, pid);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};

export default cartController;