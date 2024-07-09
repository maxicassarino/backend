import express from "express";
import PaymentService from "../services/payment.service.js";

const router = express.Router();


router.post('/payment', async (req, res) => {
    try {
        const { price } = req.body; 
        const paymentInfo = {
            amount: price, 
            currency: 'usd'
        }
        const service = new PaymentService();
        const result = await service.createPaymentIntent(paymentInfo);
        res.send({ status: "Success", payload: result });
    } catch (error) {
        console.error("Error en la ruta de pago:", error);
        res.status(500).send({ status: "Error", message: error.message });
    }
});

export default router;