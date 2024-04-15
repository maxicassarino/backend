import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const usersCollection = "users"

const usersShema = new mongoose.Schema({
    name: {type: String, required: true},
    lastname: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

usersShema.plugin(mongoosePaginate)

const usersModel = mongoose.model(usersCollection, usersShema)

export default usersModel