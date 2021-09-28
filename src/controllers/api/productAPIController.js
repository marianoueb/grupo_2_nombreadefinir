const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { query } = require('express');
const { validationResult } = require("express-validator")

module.exports = {
    index: (req, res) => {
        db.Product.findAll({
                include: [
                    {association: "Brand"},
                    {association: "Categories"}
                ]})
            .then(products => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'api/product'
                },
                data: products
            }
                res.json(respuesta);
            })
            .catch(error => console.log(error))
    },
    show: (req, res) => {
        db.Product.findByPk(req.params.id,{
            include: [
                {association: "Brand"},
                {association: "Categories"}
            ]})
            .then(producto => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: producto.length,
                        url: '/api/product/:id'
                    },
                    data: producto
                }
                res.json(respuesta);
            })
            .catch(error => console.log(error));
    }
}