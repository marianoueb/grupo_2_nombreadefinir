function middleware(req, res, next){
    res.locals.isLogged = false;
    if (req.session){
        if (req.session.loggedUser) {
            res.locals.isLogged = true
            res.locals.loggedUser = req.session.loggedUser
            // console.log("isLogged es ",res.locals.isLogged);     
        }
    }
    else{ console.log("No hay nada en la sesion") }
    next()
}

module.exports = middleware