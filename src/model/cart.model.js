import mongoose from "mongoose";

const cartCollection = "carts"

const cartShema = new mongoose.Schema({
    productos: {type: Array, default: []},
})

const cartModel = mongoose.model(cartCollection, cartShema)

export default cartModel