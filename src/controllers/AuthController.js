const UserModel = require('../models/UserModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');

const authConfig = require('../config/auth.json');

class AuthController {
    async register(req, res) {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.sendStatus(400);
        };

        if(!emailValidator.validate(email)) {
            return res.json({code: 'esse email nao e valido'})
        }

        try {
            if(await UserModel.findOne({ email: email })) {
                return res.json({ msg: 'esse email ja esta em uso' })
            }

            const user = await UserModel.create({
                name, email, password,
            });

            user.password = undefined;
            user.createAt = undefined;
            user._id = undefined;
            
            const token =  jwt.sign({id: user._id}, authConfig.secret, {
                expiresIn: 86400,
            });

            res.json({user, token: token, auth: true});
        }catch(erro) {
            res.json({code: erro});
        }
    };
    async authentication(req, res) {
        const { email, password } = req.body;

        try {
            const user = await UserModel.findOne({email: email});
            
            if(!user) {
                return res.json({code: 'email incorreto!'});
            };

            if(!await bcrypt.compare(password, user.password)) {
                return res.json({code: 'senha incorreta!'});
            };

            user.password = undefined;
            user.createAt = undefined;
            user._id = undefined;

            const token =  jwt.sign({id: user._id}, authConfig.secret, {
                expiresIn: 86400,
            });

            res.json({user, token: token, auth: true})

        }catch {
            res.json({code: 'algo deu errado'});
        };
    };
    verifyJWT(req, res, next) {
        const token = req.headers['x-access-token'];
        jwt.verify(token, authConfig.secret, (erro, decoded) => {
            if(erro) {
                return res.status(401).end();
            }

            next()
        })
    }
}

module.exports = new AuthController;