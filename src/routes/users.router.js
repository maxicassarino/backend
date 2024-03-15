import express from 'express';
import usersModel from '../model/users.model.js';

const router = express.Router()


router.use(express.json())
router.use(express.urlencoded({extended: true}))


// Middleware para rutas públicas
const publicRouteMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        // Si hay una sesión activa, redirige al perfil
        res.redirect('/profile');
    } else {
        // Si no hay una sesión activa, continuar con la siguiente ruta
        next();
    }
};

// Middleware para rutas privadas
const privateRouteMiddleware = (req, res, next) => {
    if (!req.session.user) {
        // Si no hay una sesión activa, redirige al login
        res.redirect('/login');
    } else {
        // Si hay una sesión activa, continuar con la siguiente ruta
        next();
    }
};


// Endpoints


router.get('/profile', privateRouteMiddleware, async (req, res) => {
    try {
        // Renderiza con los datos del usuario
        res.render('profile', { 
            user: req.session.user,
            isAdmin: req.session.user.email === 'adminCoder@coder.com' && req.session.user.password === 'adminCod3r123'
        });
    } catch (error) {
        console.error("Error al obtener usuario: ", error);
        res.status(500).json({ error: 'Error al obtener usuario.' });
    }
});


router.get('/login', publicRouteMiddleware, (req, res) => {
    res.render('login');
});


router.get('/register', publicRouteMiddleware, (req, res) => {
    res.render('register');
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Verifica si el usuario existe
        const user = await usersModel.findOne({ email, password });
        if (!user) {
            return res.redirect('/register');
        }
        // Guarda el usuario en la sesión
        req.session.user = user;
        res.redirect('/profile');
    } catch (error) {
        console.error("Error al iniciar sesión: ", error);
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
});


router.post('/register', publicRouteMiddleware, async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;
        // Verifica si el usuario ya existe
        const existingUser = await usersModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }
        // Crea un nuevo usuario
        let result = await usersModel.create({name, lastname, email, password})
        res.redirect('/profile');
    } catch (error) {
        console.error("Error al registrar usuario: ", error);
        res.status(500).json({ error: 'Error al registrar usuario.' });
    }
});


router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});


export default router;