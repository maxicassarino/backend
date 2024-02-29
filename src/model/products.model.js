import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = "products"

const productsShema = new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, require: true},
    stock: {type: Number, require: true}
})

productsShema.plugin(mongoosePaginate)

const productsModel = mongoose.model(productsCollection, productsShema)

export default productsModel