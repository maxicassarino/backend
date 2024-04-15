import express from 'express';
import usersModel from '../model/users.model.js';
import { createHash, isValidatePassword } from '../public/js/utils.js';
import passport from 'passport';

const router = express.Router()


router.use(express.json())
router.use(express.urlencoded({extended: true}))


// Endpoints


router.get('/profile', async (req, res) => {
    try {
        if (!req.session.user) {
            // Si no hay una sesión activa, redirige al login
            return res.redirect('/login');
        }
        const isAdmin = req.session.user.email === 'adminCoder@coder.com';
        // Verifica si el usuario es admin 
        if (isAdmin && isValidatePassword(req.session.user, 'adminCod3r123')) {
            res.render('profile', { 
                user: req.session.user,
                isAdmin: true
            });
        } else {
            res.render('profile', { 
                user: req.session.user,
                isAdmin: false,
        })}
    } catch (error) {
        console.error("Error al obtener usuario: ", error);
        res.status(500).json({ error: 'Error al obtener usuario.' });
    }
});


router.get('/login', (req, res) => {
    if (req.session && req.session.user) {
        // Si hay una sesión activa, redirige al perfil
        return res.redirect('/profile?error=activeSession')
    } else {
    res.render('login');
}});


router.get('/register', (req, res) => {
    if (req.session && req.session.user) {
        // Si hay una sesión activa, redirige al perfil
        return res.redirect('/profile?error=activeSession')
    } else {
    res.render('register');
}});


router.post('/login', passport.authenticate('login', {failureRedirect: '/register?error=login'}), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/profile?success=login');
});


router.post('/register', passport.authenticate('register', {failureRedirect: '/register?error=register'}), async (req, res) => {
    res.redirect('/login?success=register');
});


router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login?success=logout');
    });
});


router.get('/reset-password', (req, res) => {
    res.render('reset-password');
});


router.post('/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await usersModel.findOne({ email });
        if (!user) {
            return res.redirect('/login?error=userNotFound');
        }
        user.password = createHash(newPassword);
        await user.save();
        // Redirigir a la página de login con un mensaje de éxito
        res.redirect('/login?success=passwordReset');
    } catch (error) {
        console.error("Error al restaurar contraseña: ", error);
        res.status(500).json({ error: 'Error al restaurar contraseña.' });
    }
});


router.get('/github', passport.authenticate('github', {failureRedirect: '/login?error=GithubLogin'}), async (req, res) => {});


router.get('/githubcallback', passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/profile?success=login');
});


export default router;