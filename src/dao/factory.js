import config from "../config/config.js";
import mongoose from "mongoose";

export let Cart;

switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect("mongodb+srv://maximocassarino:123452024@coder.cwgcrt2.mongodb.net/shop?retryWrites=true&w=majority&appName=coder")
        
        const { default: CartMongo } = await import("./mongo/carts.mongo.js")

        Cart = CartMongo;
        
        break;

    case "MEMORY":
        const { default: CartMemory } = await import("./memory/carts.memory.js")

        Cart = CartMemory;
        
        break;

}