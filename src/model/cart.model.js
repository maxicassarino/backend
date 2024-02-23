import mongoose from "mongoose";

const cartsCollection = "carts"

const cartsShema = new mongoose.Schema({
    productos: {type: Array, required: true},
})

const cartsModel = mongoose.model(cartsCollection, cartsShema)

export default cartsModel