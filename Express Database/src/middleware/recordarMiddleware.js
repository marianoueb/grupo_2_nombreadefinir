const user = require("../models/users")
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { query } = require('express');

async function recordarMiddleware(req, res, next){ 
    if (req.cookies.email) {
        res.locals.isLogged = false
        let emailInCookie = req.cookies.email;
        let actualUser = await db.User.findOne({
            where: {
                email: emailInCookie
            }
        }).then(result => {return result}).catch(error => {console.log(error);})
        
        if (actualUser) {
            req.session.loggedUser = actualUser
        }
        
        if (req.session.loggedUser) {
            res.locals.loggedUser = req.session.loggedUser;
            res.locals.isLogged = true
        }
    }

    next();
}

module.exports = recordarMiddleware 