import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import productRouter from "./routes/products.router.js"
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()


// Middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/publicSocket')))


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
const httpServer = app.listen(PORT, () => console.log(`Server funcionando en puerto ${PORT}`));


// Socket.io

const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    console.log("Nueva Conexión")
    socket.on('message', data => {
        console.log(data)
    })
})