const user = require("../models/users")

function recordarMiddleware(req, res, next){
    if (req.cookies) {
        res.locals.isLogged = false
        let emailInCookie = req.cookies.email;
        let actualUser = user.oneEmail(emailInCookie);

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