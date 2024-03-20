import passport from "passport";
import local from "passport-local";
import usersModel from '../../model/users.model.js';
import { createHash, isValidatePassword } from './utils.js';

const localStrategy = local.Strategy

const initializePassport = () => {

passport.use('register', new localStrategy (
    {passReqToCallback: true, usernameField: "email"}, async(req, username, contraseña, done) => {
        const {name, lastname, email, password} = req.body 
        try {
            let user = await usersModel.findOne({email: username})
            if (user) {
                return res.redirect('/login?error=existingUser');
            }
            const newUser = {name, lastname, email, password: createHash(password)}
            let result = await usersModel.create(newUser)
            return done(null, result)
        } catch (error){
            return done("Error al obtener el usuario" + error)
        }
}))
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async(id, done) => {
        let user = await usersModel.findById(id)
        done(null, user)
    })
}

export default initializePassport