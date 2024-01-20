const express = require("express")
const fs = require("fs");

const app = express()

const filePath = '../desafio2/productos.json';

const data = fs.readFileSync(filePath, 'utf-8');
const productos = JSON.parse(data);

app.get('/products', (req, res) => {
    let limite = parseInt(req.query.limit);
    if (!isNaN(limite) && limite > 0) {
        productosLimitados = productos.slice(0, limite);
        return res.send(productosLimitados);
    } else {
        return res.send(productos);
    }
})


app.get('/products/:id', (req, res) => {
    const productoId = req.params.id;
    let producto = productos.find((p) => p.id == productoId);
    if (producto) {
        return res.send(producto);
    } else {
        return res.send("Producto no encontrado.");
    }
})


const PORT = 8080;
app.listen(PORT, () => console.log(`Server funcionando en puerto ${PORT}`));