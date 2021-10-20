const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { query } = require('express');
const { validationResult } = require("express-validator")

module.exports = {
    index: async (req, res) => {
        db.Brand.findAll({
                include: [
                    {association: "Products"}
                ]})
            .then(brands => {
            let brandList = [];
            for (let i = 0; i < brands.length; i++) {
                const element = brands[i];
                let actualBrand = {
                    id: element.id,
                    brand: element.brand,
                    detail: "/api/brand/"+element.id
                }
                brandList.push(actualBrand)
            }
            let respuesta = {
                meta: {
                    status : 200,
                    count: brands.length,
                    url: '/api/brands/'
                },
                data: brandList 
            }
                res.json(respuesta);
            })
            .catch(error => console.log(error))
    },
    show: (req, res) => {
        db.Brand.findByPk(req.params.id,{
            include: [
                {association: "Products"}
            ]})
            .then(marca => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: marca.length, 
                        url: '/api/brand/'+req.params.id
                    },
                    data: {
                        id: marca.id,
                        brand: marca.brand,
                        logo: "http://localhost:3001/img/brands/"+marca.logo
                    }
                }
                res.json(respuesta);
            })
            .catch(error => console.log(error));
    },
    biggerBrand: (req, res) => {
        db.Brand.findAll({
            include: [
                {association: "Products"}
            ],
            attributes: {
                include: [
                [
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM Products 
                        WHERE Products.brand_id = Brand.id
                    )`),
                    'ProdCount'
                ]
            ]},
            order : [[sequelize.literal('ProdCount'), 'DESC']]
        }).then(brands => {
            let brandCount = [ ]
            let topCount = []
            for (let i = 0; i < brands.length; i++) {
                let actualBrand = {}
                const brand = brands[i];
                actualBrand["id"] = brand.id
                actualBrand["brand"] = brand.brand
                actualBrand["count"] = brand.Products.length;
                actualBrand["logo"] = "http://localhost:3001/img/brands/" + brand.logo
                actualBrand["detail"] = "/api/brand/"+brand.id
                brandCount.push(actualBrand)
                if (i < 3) {
                    topCount.push(actualBrand)
                }
            }
            let respuesta = {
                meta: {
                    status : 200,
                    count: brands.length,
                    url: '/api/brands/most'
                },
                data: brandCount,
                top: topCount
            }
            res.json(respuesta);
            })
            .catch(error => console.log(error))
    }
}