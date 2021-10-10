const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { query } = require('express');

module.exports = {
    index: async (req, res) => {
        if ( req.session.loggedUser ){
            var cart = await db.Cart.findOne({
                include: [
                    {association: "Orders"},
                    {association: "Users"}
                ],
                where: { user_id: req.session.loggedUser.id },
                order: [ [ 'id', 'DESC' ]],
            }).then(result => {return result}).catch(error => {return error})
        
        var list = []
        for (let i = 0; i < cart.Orders.length; i++) {
            const order = cart.Orders[i];
            var product = await db.Product.findOne({
                include: [
                    {association: "Brand"}
                ],
                where: { id: order.product_id }
            }).then(result => {return result}).catch(error => console.log(error))
            list.push(product)
        }
        } else { 
            var cart = ["No user logged"]
            var list = ["No user logged"]
        }
        
        res.render("productCart", { 
        cart: cart,
        list: list,
        title: "Carrito",
        viewCat: "products",
        style: "productCart.css"
    })
}, 
    clear: async (req,res) => {
        let cart = await db.Cart.findOne({
            include: [
                {association: "Orders"},
                {association: "Users"}
            ],
            where: { user_id: req.session.loggedUser.id },
            order: [ [ 'id', 'DESC' ]],
        }).then(result => {return result}).catch(error => {return error})
        db.Order.destroy({
            where: {
                cart_id: cart.id 
            }
        })
        res.redirect("/cart")  
    },
    completed: async (req, res) => {
        let cart = await db.Cart.findOne({
            include: [
                {association: "Orders"},
                {association: "Users"}
            ],
            where: { user_id: req.session.loggedUser.id },
            order: [ [ 'id', 'DESC' ]],
        }).then(result => {return result}).catch(error => {return error})
        let date = new Date()
        db.Cart.update({
            status: 0,
            date: date
        },{
            where: {
                id: cart.id
            }
        })
        db.Cart.create({
            user_id: req.session.loggedUser.id,
            status: 1,
            date: date
        })
        res.redirect("/")
    },
    removeOnce: async (req,res) => {
        let cart = await db.Cart.findOne({
            include: [
                {association: "Orders"},
                {association: "Users"}
            ],
            where: { user_id: req.session.loggedUser.id },
            order: [ [ 'id', 'DESC' ]],
        }).then(result => {return result}).catch(error => {return error})
        db.Order.destroy({
            where: {
                cart_id: cart.id,
                product_id: req.params.id
            }
        })
        res.redirect("/cart")
    },
    addOnce: async (req,res) => {
        let cart = await db.Cart.findOne({
            include: [
                {association: "Orders"},
                {association: "Users"}
            ],
            where: { user_id: req.session.loggedUser.id },
            order: [ [ 'id', 'DESC' ]],
        }).then(result => {return result}).catch(error => {return error})
        let order = await db.Order.findOne({
            where: {
                cart_id: cart.id,
                product_id: req.params.id
            }
        }).then(result => {return result}).catch(error => {return error})
        let suma = order.quantity + 1

        db.Order.update({
            quantity: suma
        },{
            where: {
                cart_id: cart.id,
                product_id: req.params.id
            }
        })
        res.redirect("/cart")
    }
}