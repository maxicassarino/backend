import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import handlebars from 'express-handlebars'
import productRouter from "./routes/products.router.js"
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.router.js';
import ticketsRouter from './routes/tickets.router.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './public/passport.config.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';


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


// Cookies

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://maximocassarino:123452024@coder.cwgcrt2.mongodb.net/sessions?retryWrites=true&w=majority&appName=coder",
        ttl: 60
    }),
    secret: "12345",
    resave: false,
    saveUninitialized: false
}));

// Passport

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


// Rutas

app.use('/', productRouter);
app.use('/', cartRouter);
app.use('/', viewsRouter);
app.use('/', usersRouter);
app.use('/', ticketsRouter);



// Descargas

app.get('/descargas', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'uploadFiles.html'));
});

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


// Mongo

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://maximocassarino:123452024@coder.cwgcrt2.mongodb.net/sessions?retryWrites=true&w=majority&appName=coder")
    }catch (error) {
        console.log("el error es " + error)
    }
};
connectDB()