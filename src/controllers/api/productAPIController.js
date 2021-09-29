const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { query } = require('express');
const { validationResult } = require("express-validator")

module.exports = {
    index: async (req, res) => {
        let cats = await db.Category.findAll({
            include: [
                {association: "Products"}
            ]}).then(result => {return result}).catch(error => {console.log(error)})
        let catCount = { }
        for (let i = 0; i < cats.length; i++) {
            const cat = cats[i];
            var categoria = cat.category;
            catCount[categoria] = cat.Products.length;
        }
        let brands = await db.Brand.findAll({include: [{association: "Products"}]}).then(result => {return result}).catch(error => {console.log(error)})
        let brandCount = { }
        for (let i = 0; i < brands.length; i++) {
            const brand = brands[i];
            var marca = brand.brand;
            brandCount[marca] = brand.Products.length;
        }
        console.log(brands);
        db.Product.findAll({
                include: [
                    {association: "Brand"},
                    {association: "Categories"}
                ]})
            .then(products => {
            let productList = [];
            for (let i = 0; i < products.length; i++) {
                const element = products[i];
                let actualUser = {
                    id: element.id,
                    name: element.name,
                    description: element.description,
                    properties: {
                        brand: element.Brand.brand,
                        category: element.Categories.category
                    },
                    detail: "/api/product/"+element.id
                }
                productList.push(actualUser)
            }
            let respuesta = {
                meta: {
                    status : 200,
                    count: products.length,
                    countByCategory: catCount, 
                    countByBrand: brandCount,
                    url: '/api/products/'
                },
                data: productList 
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
                        url: '/api/product/'+req.params.id
                    },
                    data: {
                        id: producto.id,
                        name: producto.name,
                        description: producto.description,
                        price: producto.price,
                        properties: {
                            brand: producto.Brand.brand,
                            category: producto.Categories.category
                        },
                        image: "/img/products/"+producto.image
                    }
                }
                res.json(respuesta);
            })
            .catch(error => console.log(error));
    }
}