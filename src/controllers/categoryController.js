const catModel = require('../models/category');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { query } = require('express');

module.exports = {
    index: async (req, res) => {
        await db.Category.findAll()
            .then(cat => {
                res.render('categories/list', {
                    list: cat,
                    title: "Categorías",
                    viewCat: "categories",
                    style: "index.css", 
                    listTitle: "Listado de categorias"
                })
            })
            .catch(error => console.log(error))
    },
    show: async (req,res) => { 
        let search = {
            status: false,
            category: false,
            categoryParam: undefined,
            brand: false,
            brandParam: undefined,
            query: false
        }

        let marcas = await db.Brand.findAll()
            .then(brands => { return brands })
            .catch(error => console.log(error));

        let categorias = await db.Category.findAll()
            .then(cat => { return cat})
            .catch(error => { console.log(error);})

        let products = await db.Product.findAll({
            include: [
                {association: "Categories"}
            ],
            where: {
                category_id: req.params.id
            }
            })
            .then(productos => { return productos })
            .catch(error => console.log(error));
        
        let selected = await db.Category.findByPk(req.params.id,{
            include: [
                {association: "Products"}
            ]})
            .then(producto => { return producto })
            .catch(error => console.log(error)); 
        
        res.render('product/list', {
            list: products,
            brands: marcas,
            cats: categorias,
            category: selected,
            title: "Detalle del producto",
            viewCat: "products",
            style: "list.css", 
            listTitle: "Listado de productos",
            search: search
        })
    }
}