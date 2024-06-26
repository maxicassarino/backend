import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import usersModel from '../model/users.model.js';
import { createHash, isValidatePassword } from './utils.js';
import CustomError from '../services/errors/CustomError.js';
import EErrors from "../services/errors/enums.js";
import { generateUserErrorInfo } from '../services/errors/info.js'

const localStrategy = local.Strategy

const initializePassport = () => {

    passport.use('github', new GitHubStrategy ({
        clientID: 'Iv1.45d65b9c5f162486', 
        clientSecret: '514162796f65694ef288f0ed347d8adb120d218d', 
        callbackURL: "http://localhost:8080/githubcallback"
    }, async(accessToken, refreshToken, profile, done) => {
            try {
                let user = await usersModel.findOne({email: profile._json.email})
                if (!user) {
                    let newUser = {
                        name: profile._json.name,
                        lastname: '',
                        email: profile._json.email,
                        password: profile._json.id,
                    }
                    let result = await usersModel.create(newUser)
                    return done(null, result)
                } else {
                    return done(null, user)
                }
            } catch (error){
                return done(error)
            }
    }))

    passport.use('register', new localStrategy (
        {passReqToCallback: true, usernameField: "email"}, async(req, username, contraseña, done) => {
            try {
                const {name, lastname, email, password} = req.body 
                if (!name || !lastname || !email || !password) {
                    CustomError.createError({
                        name: "Error en el registro de usuario",
                        cause: generateUserErrorInfo({name, lastname, email, password}),
                        message: "Falta de datos",
                        code: EErrors.INVALID_TYPES_USERERROR
                    })
                }
                let user = await usersModel.findOne({email: username})
                if (user) {
                    return res.redirect('/login?error=existingUser');
                }
                const newUser = {name, lastname, email, password: createHash(password)}
                let result = await usersModel.create(newUser)
                return done(null, result)
            } catch (error){
                return done("Error al obtener el usuario: " + error);
            }
    }))

    passport.use('login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await usersModel.findOne({ email });
            if (!user || !isValidatePassword(user, password)) {
                return done(null, false, { message: 'Usuario o contraseña incorrectos' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async(id, done) => {
        let user = await usersModel.findById(id)
        done(null, user)
    })
}

export default initializePassport