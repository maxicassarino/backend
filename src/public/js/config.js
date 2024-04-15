import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGOURL,
    adminName: process.env.ADMINNAME,
    adminPassword:  process.env.ADMINPASSWORD
}

const environment = "DEV"

dotenv.config({path: environment == "DEV" ? '.env' : '.envproduction'})