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
        let catCount = [ ]
        for (let i = 0; i < cats.length; i++) {
            let actualCat = {}
            const cat = cats[i];
            actualCat["id"] = cat.id
            actualCat["category"] = cat.category
            actualCat["count"] = cat.Products.length;
            catCount.push(actualCat)
        }
        let brands = await db.Brand.findAll({include: [{association: "Products"}]}).then(result => {return result}).catch(error => {console.log(error)})
        let brandCount = []
        for (let i = 0; i < brands.length; i++) {
            let actualBrand = {}
            const brand = brands[i];
            var marca = brand.brand;
            actualBrand["id"] = brand.id
            actualBrand["brand"] = brand.brand
            actualBrand["count"] = brand.Products.length;
            brandCount.push(actualBrand)
        }

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
                    price: element.price,
                    brand: element.Brand.brand,
                    category: element.Categories.category,
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
                        brand: producto.Brand.brand,
                        category: producto.Categories.category,
                        image: "http://localhost:3001/img/products/"+producto.image
                    }
                }
                res.json(respuesta);
            })
            .catch(error => console.log(error));
    },
    lastUploaded: (req, res) => {
        db.Product.findAll({
            order : [
                ['id', 'DESC']
            ],
            limit: 3,
            include: [
                {association: "Brand"},
                {association: "Categories"}
            ]
        })  
            .then(respArray => {
            let productList = [];
            for (let i = 0; i < respArray.length; i++) {
                const element = respArray[i];
                let actualElement = {
                    id: element.id,
                    name: element.name,
                    brand: element.Brand.brand,
                    category: element.Categories.category,
                    detail: "/api/product/"+element.id,
                    image: "http://localhost:3001/img/products/"+element.image
                }
                productList.push(actualElement)
            }
            let respuesta = {
                meta: {
                    status : 200,
                    total: respArray.length,
                    url: '/api/products/last'
                },
                data: productList
            }
                res.json(respuesta);
            })
            .catch(error => console.log(error))
    },
    mostBought: (req, res) => {
        db.Order.findAll({
            include: [
                {association: "Products", include: ["Brand","Categories"]},
                {association: "Carts"},
            ],
            attributes: {
                include: [
                [
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM Orders 
                        WHERE Orders.product_id = Products.id
                    )`),
                    'ProdCount'
                ]
            ]},
            order : [[sequelize.literal('ProdCount'), 'DESC']], 
            limit: 3,
            group: ["Products.id"]
        })  
            .then(respArray => {
            let productList = [];
            for (let i = 0; i < respArray.length; i++) {
                const element = respArray[i]; 
                let actualElement = { 
                    product_id: element.product_id,
                    product: element.Products.name,
                    brand: element.Products.Brand.brand,
                    category: element.Products.Categories.category,
                    times: element.dataValues.ProdCount,
                    detail: "/api/product/"+element.Products.id,
                    image: "http://localhost:3001/img/products/"+element.Products.image
                }
                productList.push(actualElement)
            }
            let respuesta = {
                meta: {
                    status : 200,
                    total: respArray.length,
                    url: '/api/products/most'
                },
                data: productList
            }
                res.json(respuesta);
            })
            .catch(error => console.log(error))
    },
    sold: (req, res) => {
        db.Cart.findAll({
            include: [
                {association: "Orders", include: ["Products"]}
            ],
            where: {
                status: 0
            }
        })  
            .then(respArray => {
            let cartList = [];
            let cartSold = 0;
            let productSold = 0;
            for (let i = 0; i < respArray.length; i++) {
                const element = respArray[i]; 
                let actualElement = { 
                    id: element.id,
                    date: element.date,
                    user: element.user_id
                }
                cartList.push(actualElement) 
                productSold = element.Orders.length + productSold
                cartSold = cartSold + 1
            }
            let respuesta = {
                meta: {
                    status : 200,
                    productsSold: productSold,
                    cartCount: cartSold,
                    url: '/api/products/sold'
                },
                data: cartList
            }
                res.json(respuesta);
            })
            .catch(error => console.log(error))
    }
}