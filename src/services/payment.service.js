import Stripe from 'stripe';

export default class PaymentService {
    constructor(){
        this.stripe = new Stripe('sk_test_51Pak1xRoP2EXcHXXAOVVhx1LWHcquFGTCvxrQvnijzD0kF2xlcK4qWjPqr5Wa9ilZP0qz7j8XmERWifGBxBUuVug00A1U08XK3')
    }
    createPaymentIntent = async (data) => {
        try {
            const paymentIntent = await this.stripe.paymentIntents.create(data); 
            return paymentIntent;
        } catch (error) {
            console.error("Error en createPaymentIntent:", error);
            throw new Error("No se pudo crear el intento de pago.");
        }

    }
}