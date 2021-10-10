const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { query } = require('express');
const { validationResult } = require("express-validator")
const path = require('path');
const fs = require('fs');

module.exports = {
    index: (req, res) => {
        db.User.findAll({
            attributes: {exclude: ['password',"type_id"]}})  
            .then(users => {
            let userList = [];
            for (let i = 0; i < users.length; i++) {
                const element = users[i];
                let actualUser = {
                    id: element.id,
                    name: element.name,
                    surname: element.surname,
                    email: element.email,
                    detail: "/api/user/"+element.id
                }
                userList.push(actualUser)
            }
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: '/api/users'
                },
                data: userList
            }
                res.json(respuesta);
            })
            .catch(error => console.log(error))
    },
    show: (req, res) => {
        db.User.findByPk(req.params.id,{
            attributes: {exclude: ['password',"type_id"]}})
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: '/api/user/'+req.params.id
                    },
                    data: {
                        id: user.id,
                        name: user.name,
                        surname: user.surname,
                        email: user.email, 
                        tel: user.tel,
                        avatar: "/img/users/"+user.avatar
                    }
                }
                res.json(respuesta);
            })
            .catch(error => console.log(error));
    },
    admin: (req, res) => {
        db.User.findAll({
            attributes: {exclude: ['password']}})  
            .then(users => {
            let userList = [];
            for (let i = 0; i < users.length; i++) {
                const element = users[i];
                let actualUser = {
                    id: element.id,
                    name: element.name,
                    surname: element.surname,
                    email: element.email,
                    type_id: element.type_id,
                    detail: "/api/user/"+element.id
                }
                userList.push(actualUser)
            }
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: '/api/users/total/'
                },
                data: userList
            }
                res.json(respuesta);
            })
            .catch(error => console.log(error))
    },
    lastRegistered: (req, res) => {
        db.User.findAll({
            order : [
                ['id', 'DESC']
            ],
            limit: 3, 
            attributes: {exclude: ['password',"type_id"]}
        })  
            .then(users => {
            let userList = [];
            for (let i = 0; i < users.length; i++) {
                const element = users[i];
                let actualUser = {
                    id: element.id,
                    name: element.name,
                    surname: element.surname,
                    email: element.email,
                    avatar: "http://localhost:3001/img/users/"+element.avatar,
                    detail: "/api/user/"+element.id
                }
                userList.push(actualUser)
            }
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: '/api/users'
                },
                data: userList
            }
                res.json(respuesta);
            })
            .catch(error => console.log(error))
    },
    admins: (req, res) => {
        db.User.findAll({
            attributes: {exclude: ['password']},
            where: {
                type_id: {
                    [Op.gt] : 1
                }
            }
        })  
            .then(users => {
            let userList = [];
            for (let i = 0; i < users.length; i++) {
                const element = users[i];
                let actualUser = {
                    id: element.id,
                    name: element.name,
                    surname: element.surname,
                    email: element.email,
                    type_id: element.type_id,
                    avatar: "http://localhost:3001/img/users/"+element.avatar,
                    detail: "/api/user/"+element.id
                }
                userList.push(actualUser)
            }
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: '/api/users/admin/'
                },
                data: userList
            }
                res.json(respuesta);
            })
            .catch(error => console.log(error))
    },
    sales: (req, res) => {
        db.Cart.findAll({
            include: [
                {association: "Users"},
            ],
            where: {
                status: 0
            },
            attributes: {
                include: [
                [
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM Carts 
                        WHERE Carts.user_id = Users.id AND Carts.status = 0
                    )`),
                    'CartCount'
                ]
            ]},
            group: ["user_id"]
        })  
            .then(respArray => {
            let userList = [];
            let salesAcc = 0;
            for (let i = 0; i < respArray.length; i++) {
                const element = respArray[i]; 
                console.log(element.dataValues.CartCount);
                let cartCount = element.dataValues.CartCount;
                salesAcc = salesAcc + cartCount;
                userList.push(element.Users);
            }
            let respuesta = {
                meta: {
                    status : 200,
                    buyers: userList,
                    sales: salesAcc,
                    url: '/api/products/sales'
                },
                data: respArray
            }
                res.json(respuesta);
            })
            .catch(error => console.log(error))
    }
}