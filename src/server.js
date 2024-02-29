import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import ProductManager from './manager/ProductManager.js';
import productRouter from "./routes/products.router.js"
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()


// Middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))


// Handlebars

app.engine("handlebars", handlebars.engine({
    extname: 'handlebars',
    defaultLayout: false,
    layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
app.set("views", __dirname + '/views');
app.set('view engine', "handlebars");


// Rutas

app.use('/', productRouter);
app.use('/', cartRouter);
app.use('/', viewsRouter)

app.get('/descargas', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'uploadFiles.html'));
});


// Descargas

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'descargas');
    },
    filename: (req, file, cb) => {
        const originalname = file.originalname;
        const ext = path.extname(originalname);
        cb(null, `${originalname}`);
    },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.send({ message: 'Archivo subido' });
});


// Puerto

const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Server funcionando en puerto ${PORT}`));


// Socket.io

const socketServer = new Server(httpServer)
const productManager = new ProductManager();

socketServer.on('connection', async (socket) => {
    console.log("Nueva Conexión")

    sendUpdatedProducts(socket)

    async function sendUpdatedProducts(socket) {
        try {
            const updatedProducts = await productManager.getProducts()
            socket.emit('updateProducts', updatedProducts)
        } catch (error) {
            console.error("Internal server error", error)
            socket.emit('updateProducts', [])
        }
    }

    //Logic for save 

    socket.on('addProduct', async (newProductData) => {
        try {
            const result = await productManager.addProduct(newProductData)
            socket.emit('productAdded', result)
            sendUpdatedProducts(socketServer)
        } catch (error) {
            console.error('Internal server error', error)
        }})
});


// MONGOOUSE

const enviroment = async () => {
    await mongoose.connect("mongodb+srv://maximocassarino:123452024@coder.cwgcrt2.mongodb.net/shop?retryWrites=true&w=majority&appName=coder")
    console.log("Conectado a Base de Datos")
}
enviroment()