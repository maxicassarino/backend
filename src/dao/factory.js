import config from "../config/config.js";
import mongoose from "mongoose";

export let Cart;
export let Products;
export let Tickets;

switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect("mongodb+srv://maximocassarino:123452024@coder.cwgcrt2.mongodb.net/shop?retryWrites=true&w=majority&appName=coder")
        
        const { default: CartMongo } = await import("./mongo/carts.mongo.js")
        const { default: ProductsMongo } = await import("./mongo/products.mongo.js")
        const { default: TicketsMongo } = await import("./mongo/tickets.mongo.js")

        Cart = CartMongo;
        Products = ProductsMongo;
        Tickets = TicketsMongo;
        
        break;

    case "MEMORY":
        const { default: CartMemory } = await import("./memory/carts.memory.js") 
        const { default: ProductsMemory } = await import("./memory/products.memory.js") 
        const { default: TicketsMemory } = await import("./memory/tickets.memory.js") 

        Cart = CartMemory;
        Products = ProductsMemory;
        Tickets = TicketsMemory;
        
        break;

}