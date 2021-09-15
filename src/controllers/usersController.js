const user = require("../models/users")
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { query } = require('express');
const bcrypt = require("bcrypt")

module.exports = {
    index: async (req, res) => {
        let usuarios = await db.User.findAll({
                include: [
                    {association: "UserType"}
                ]})
            .then(users => { return users })
            .catch(error => console.log(error))
    
        res.render('users/list', {
            list: usuarios,
            title: "Listado de usuarios",
            viewCat: "users",
            style: "userList.css", 
            listTitle: "Listado de usuario"
        })
    },
    show: async (req, res) => {
        let usuarios = await db.User.findAll({
            include: [
                {association: "UserType"}
            ]})
        .then(users => { return users })
        .catch(error => console.log(error))

        let selected = await db.User.findByPk(req.params.id,{
            include: [
                {association: "UserType"}
            ]})
            .then(usuario => { return usuario })
            .catch(error => console.log(error));

        res.render("users/profile",{
            list: usuarios,
            user: selected,
            title: "Perfil del usuario",
            viewCat: "users",
            style: "userProfile.css"
        })
    },
    create: (req,res) => {
        res.render("users/register",{
        title: "Registrarse",
        viewCat: "users",
        style: "register.css"
    })
    },
    save: (req,res) => {
        db.User.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            tel: req.body.tel,
            avatar: req.file.filename,
            type_id: 1
        })
        res.redirect("/")
    },
    edit: async (req,res) => {
        let id = req.params.id;

        let selected = await db.User.findByPk(id,{
            include: [
                {association: "UserType"}
            ]})
            .then(usuario => { return usuario })
            .catch(error => console.log(error));

        res.render("users/edit",{
            title: "Editar perfil",
            viewCat: "users",
            style: "register.css",
            user: selected
        })
    },
    update: (req,res) =>{
        db.User.update({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            tel: req.body.tel,
            avatar: req.file.filename,
            type_id: 1 
        },{
            where: {
                id: req.params.id
            }
        })
        res.redirect("/users/" + req.params.id)
    },
    delete: (req,res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/users/")
    },
    loginForm: (req, res) => res.render("users/login", {
        title: "Ingreso",
        viewCat: "users",
        style: "login.css"
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