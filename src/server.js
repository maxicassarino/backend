import express from 'express';
import productRouter from "./routes/products.router.js"

const app = express()

app.use("/", productRouter)

const PORT = 8080;

app.listen(PORT, () => console.log(`Server funcionando en puerto ${PORT}`));