const user = require('../models/users');

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
    }
}