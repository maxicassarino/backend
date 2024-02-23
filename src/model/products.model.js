import mongoose from "mongoose";

const productsCollection = "products"

const productsShema = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, require: true},
    stock: {type: Number, require: true}
})

const productsModel = mongoose.model(productsCollection, productsShema)

export default productsModel