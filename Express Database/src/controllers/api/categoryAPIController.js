const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { query } = require('express');
const { validationResult } = require("express-validator")

module.exports = {
    index: async (req, res) => {
        db.Category.findAll({
                include: [
                    {association: "Products"}
                ]})
            .then(cats => {
            let catList = [];
            for (let i = 0; i < cats.length; i++) {
                const element = cats[i];
                let actualCat = {
                    id: element.id,
                    cat: element.category,
                    detail: "/api/category/"+element.id
                }
                catList.push(actualCat)
            }
            let respuesta = {
                meta: {
                    status : 200,
                    count: cats.length,
                    url: '/api/categories/'
                },
                data: catList 
            }
                res.json(respuesta);
            })
            .catch(error => console.log(error))
    },
    show: (req, res) => {
        db.Category.findByPk(req.params.id,{
            include: [
                {association: "Products"}
            ]})
            .then(cat => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: cat.length, 
                        url: '/api/category/'+req.params.id
                    },
                    data: {
                        id: cat.id,
                        category: cat.category
                    }
                }
                res.json(respuesta);
            })
            .catch(error => console.log(error));
    },
    biggerCategory: (req, res) => {
        db.Category.findAll({
            include: [
                {association: "Products"}
            ],
            attributes: {
                include: [
                [
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM Products 
                        WHERE Products.category_id = Category.id
                    )`),
                    'ProdCount'
                ]
            ]},
            order : [[sequelize.literal('ProdCount'), 'DESC']]
        }).then(cats => {
            let catCount = [ ];
            let topCount = [ ];
            for (let i = 0; i < cats.length; i++) {
                let actualCat = {}
                const cat = cats[i];
                actualCat["id"] = cat.id
                actualCat["category"] = cat.category
                actualCat["icon"] = cat.icon
                actualCat["count"] = cat.Products.length;
                actualCat["detail"] = "/api/category/"+cat.id
                catCount.push(actualCat)
                if (i < 3) {
                    topCount.push(actualCat)
                }
                }
                let respuesta = {
                    meta: {
                        status : 200,
                        count: cats.length,
                        url: '/api/categories/most'
                    },
                    data: catCount,
                    top: topCount
                }
                res.json(respuesta);
            })
            .catch(error => console.log(error))
    }
}