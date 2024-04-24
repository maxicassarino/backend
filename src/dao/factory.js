import config from "../config/config.js";
import mongoose from "mongoose";

export let Cart;
export let Products;

switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect("mongodb+srv://maximocassarino:123452024@coder.cwgcrt2.mongodb.net/shop?retryWrites=true&w=majority&appName=coder")
        
        const { default: CartMongo } = await import("./mongo/carts.mongo.js")
        const { default: ProductsMongo } = await import("./mongo/products.mongo.js")

        Cart = CartMongo;
        Products = ProductsMongo;
        
        break;

    case "MEMORY":
        const { default: CartMemory } = await import("./memory/carts.memory.js") 
        const { default: ProductsMemory } = await import("./memory/products.memory.js") 

        Cart = CartMemory;
        Products = ProductsMemory;
        
        break;

}