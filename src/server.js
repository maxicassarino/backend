import express from 'express';
import path from 'path'
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import productRouter from "./routes/products.router.js"
import cartRouter from './routes/cart.router.js'
import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js';


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()


// Middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))


// Iniciar


const productManager = new ProductManager('src/productos.json');
const cartManager = new CartManager('./src/carts.json');




// Rutas

app.use('/', productRouter);
app.use('/', cartRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/descargas', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'uploadFiles.html'));
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
app.listen(PORT, () => console.log(`Server funcionando en puerto ${PORT}`));


