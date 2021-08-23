const user = require('../models/users');
const bcrypt = require("bcrypt")

module.exports = {
    index:(req,res) => res.render("users/list",{ // Enlista los usuarios
        list: user.all(),
        title: "Listado de usuarios",
        styles: "/css/userList.css"
    }),
    show: (req,res) => { // Muestra el usuario que es citado por el ID
        if( req.params.id >= 0 ){
        res.render("users/profile",{
            list: user.all(),
            user: user.one(req.params.id),
            title: "Perfil de usuario",
            styles: "/css/userProfile.css"
        })}
    }
    ,
    create: (req,res) => {
        res.render("users/register",{
        title: "Registrarse",
        styles: "/css/register.css"
    })
    },
    save: (req,res) => {
        console.log(req.body);
        let result = user.new(req.body,req.file)
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion") 
    },
    edit: (req,res) => {
        let id = req.params.id;
        res.render("users/edit",{
            title: "Editar perfil",
            styles: "/css/register.css",
            user: user.one(req.params.id)
        })
    },
    update: (req,res) =>{
        const id = req.params.id;
        console.log(req.params.id);
        console.log("Iniciando edición de usuario")
        let result = user.edit(req.body,req.file,req.params.id)
        console.log("Finalizando edición");
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion") 
    },
    delete: (req,res) => {
        const id = req.params.id;
        console.log("id" + req.params.id);
        let result = user.delete(id);
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion") 
    },
    loginForm: (req, res) => res.render("users/login", {
        title: "Ingreso",
        styles: "/css/login.css"
    }),
    loginProcess: (req,res) => {
        let userToLogin = user.oneEmail(req.body.email);
        if (userToLogin) {
            let validator = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (validator) {
                req.session.loggedUser = userToLogin
                res.locals.loggedUser = req.session.loggedUser
                if (req.body.recordar != undefined) {
                    res.cookie("email", req.body.email, {maxAge: 60000 * 60})
                }
                console.log(req.cookies);
                res.redirect("/home/")
            } 
            else { res.redirect("/login/") }
        }
        else { res.redirect("/login/") }

    },
    logout: (req, res) => { 
        req.session.destroy()
        res.clearCookie("email")
        res.redirect("/")
    },
    admin: function(req, res){
        user.makeAdmin(req.params.id);
        res.redirect("/");
    },
    remove: function(req, res){
        user.removeAdmin(req.params.id);
        res.redirect("/")
    }
}