const user = require("../models/users")
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { query } = require('express');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator")

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
        style: "register.css",
        backErrors: 0,
        frontErrors: 0
    })
    },
    save: async (req,res) => {
        const results = validationResult(req) 
        console.log(results);
        if (results.errors.length > 0) { 
            res.render("users/register",{
                title: "Registrarse",
                viewCat: "users",
                style: "register.css",
                backErrors: results.errors,
                frontErrors: 0
            })
        } else {
            let toCreate = await db.User.create({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                tel: req.body.tel,
                avatar: req.file.filename,
                type_id: 1
        });
            let date = new Date()
            db.Cart.create({
                user_id: toCreate.id,
                status: 1,
                date: date
            })
            res.redirect("/")
        }
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
            user: selected,
            backErrors: 0
        })
    },
    update: async (req,res) =>{
        let id = req.params.id;

        let selected = await db.User.findByPk(id,{
            include: [
                {association: "UserType"}
            ]})
            .then(usuario => { return usuario })
            .catch(error => console.log(error));

        const results = validationResult(req) 
        console.log(results);
        if (results.errors.length > 0) { 
            res.render("users/edit",{
                title: "Editar perfil",
                viewCat: "users",
                style: "register.css",
                user: selected,
                backErrors: results.errors
            })
        } else {
            db.User.update({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: req.body.password,
                tel: req.body.tel,
                avatar: req.file.filename
            },{
                where: {
                    id: req.params.id
                }
            })
            res.redirect("/users/" + req.params.id)
        }
    },
    delete: async (req,res) => {
        let lista = await db.Cart.findAll({
            where: {
                user_id: req.params.id
            }
        })
        console.log("lista ", lista);
        for (let i = 0; i < lista.length; i++) {
            const element = lista[i];
            db.Order.destroy({
                where: {
                    cart_id: element.id
                }
            })
            console.log("element", element);
        }
        db.Cart.destroy({
            where: {
                user_id: req.params.id
            }
        })
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
        let actualUser = req.session.loggedUser
        if(actualUser.id == req.params.id){
            req.session.destroy()
            res.clearCookie("email")
            res.redirect("/")
        } else {
            res.redirect("/users/")
        }
    },
    loginForm: (req, res) => res.render("users/login", {
        title: "Ingreso",
        viewCat: "users",
        style: "login.css",
        backError: 0,
        frontErrors: 0
    }), 
    loginProcess: async (req,res) => {
        let logError = {
            original: {
                errno: ""
            }
        };
        let userToLogin = await db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(list => {return list}).catch(error => {
            logError = error
            console.log(error)
        })

        if (req.body.email) {
            if (userToLogin) {
                let validator = bcrypt.compareSync(req.body.password, userToLogin.password)
                if (validator) {
                    req.session.loggedUser = userToLogin
                    res.locals.loggedUser = req.session.loggedUser
                    if (req.body.recordar != undefined) {
                        res.cookie("email", req.body.email, {maxAge: 60000 * 60})
                    }
                    res.redirect("/home/")
                }  
                else { 
                    console.log("La contraseña no coincide con el email ingresado");
                    res.render("users/login", {
                        title: "Ingreso",
                        viewCat: "users",
                        style: "login.css",
                        backError: "La contraseña no coincide con el email ingresado",
                        frontErrors: 0
                    })
                }
            } else if (logError.original.errno == "-4078"){
                console.log("La base de datos está fuera de servicio");
                res.render("users/login", {
                    title: "Ingreso",
                    viewCat: "users",
                    style: "login.css",
                    backError: "La base de datos está fuera de servicio",
                    frontErrors: 0
                })
            } else { 
                console.log("El email ingresado no se encuentra registrado");
                res.render("users/login", {
                    title: "Ingreso",
                    viewCat: "users",
                    style: "login.css",
                    backError: "El email ingresado no se encuentra registrado",
                    frontErrors: 0
                })
            }
        } else {
            console.log("El campo de email debe completarse");
            res.render("users/login", {
                title: "Ingreso",
                viewCat: "users", 
                style: "login.css",
                backError: "El campo de email debe completarse",
                frontErrors: 0
            })
        }
    },
    logout: (req, res) => { 
        req.session.destroy()
        res.clearCookie("email")
        res.redirect("/")
    },
    admin: async (req, res) => {
        db.User.update({
            type_id: 2
        },{
            where: {
                id: req.params.id
            }
        })
        res.redirect("/users/" + req.params.id)
    },
    remove: async (req, res) => {
        db.User.update({
            type_id: 1
        },{
            where: {
                id: req.params.id
            }
        })
        res.redirect("/users/" + req.params.id)
    },
    owner: async (req, res) => {
        db.User.update({
            type_id: 3
        },{
            where: {
                id: req.params.id
            }
        })
        res.redirect("/users/" + req.params.id)
    }
}