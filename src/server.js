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
import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import errorHandle from './middlewares/errors/index.js'
// import compression from 'express-compression';
// import { addLogger } from './config/logger.js';
import { addLogger } from './config/logger-entorno.js';


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
config()


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


// Errors

app.use(errorHandle)


// Compression

// app.use(compression({brotli: {enable: true, zlib: {}}}))


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


// Mail

const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    }
})

app.get('/mail', async (req, res) => {
    const result = await transport.sendMail({
        from: `Correo de prueba <${process.env.MAIL_USERNAME}>`,
        to: `${process.env.MAIL_USERNAME}`,
        subject: "Correo de Prueba",
        html: `<div>
                    <h1>Correo TEST</h1>
                </div>`,
        attachments: []
    })
    res.send("Correo enviado")
})


// Logger

app.use(addLogger)

app.get("/loggerTest", (req, res) => {
    req.logger.error(`Error!!!, ${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`);
    res.send({ message: "Inicio" });
});