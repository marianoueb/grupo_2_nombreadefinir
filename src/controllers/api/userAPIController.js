const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { query } = require('express');
const { validationResult } = require("express-validator")

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
                    url: 'api/users'
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
    }
}