const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { query } = require('express');

function getCart(list) {
    
}

module.exports = {
    create: async (req, res) => {
        let list = await db.Cart.findAll({
            where: {
                user_id: req.session.loggedUser.id
            }
        })
            .then(result => {return result}).catch(error => {return error})
        db.Order.create({
            product_id: req.body.producto,
            quantity: req.body.cantidad,
            cart_id: list[list.length - 1].id
        })
        res.redirect("/product/")
    }
}