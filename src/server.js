import express from 'express';
import path from 'path'
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import productRouter from "./routes/products.router.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

// Middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Rutas

app.use("/", productRouter)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.get("/descargas", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'uploadFiles.html'))
})

// Descargas

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'descargas')
    },
    filename:(req, file, cb) => {
        const originalname = file.originalname
        const ext = path.extname(originalname)
        cb(null, `${originalname}`)
    }
})

const upload = multer({storage})

app.post("/upload", upload.single("file"), (req, res) => {
    res.send({message: "Archivo subido"})
})

const PORT = 8080;

app.listen(PORT, () => console.log(`Server funcionando en puerto ${PORT}`));