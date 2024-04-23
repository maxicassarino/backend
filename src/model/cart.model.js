import {Schema, model} from "mongoose";

const cartModel = new Schema({
    productos: {type: Array, default: []},
})

export default model("Cart", cartModel)