import mongoose from "mongoose";

const cartCollection = "carts"

const cartShema = new mongoose.Schema({
    email: {type: String, required: true},
    productos: {type: Array, default: []}
})

const cartModel = mongoose.model(cartCollection, cartShema)

export default cartModel