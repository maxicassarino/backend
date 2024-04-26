import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    email: {type: String, required: true},
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, default: 0 },
});

const ticketModel = mongoose.model(ticketsCollection, ticketSchema);

export default ticketModel;