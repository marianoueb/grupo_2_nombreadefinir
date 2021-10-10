const brandModel = require('../models/brand');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator")

module.exports = {
    index: async (req, res) => {
        await db.Brand.findAll()
            .then(brands => {
                res.render('brands/list', {
                    list: brands,
                    title: "Marcas",
                    viewCat: "brands",
                    style: "brandList.css", 
                    listTitle: "Listado de marcas"
                })
            })
            .catch(error => console.log(error))
    },
    show: async (req, res) => {
        let search = {
            status: false,
            category: false,
            categoryParam: undefined,
            brand: false,
            brandParam: undefined,
            query: false
        }

        let productos = await db.Product.findAll({
                include: [
                    {association: "Brand"},
                    {association: "Categories"}
                ],
                where: {
                    brand_id: req.params.id
                }
            })
            .then(products => { return products })
            .catch(error => console.log(error))
        
        let marcas = await db.Brand.findAll({})
            .then(brands => { return brands })
            .catch(error => console.log(error));

        let categorias = await db.Category.findAll()
            .then(cat => { return cat})
            .catch(error => { console.log(error);})

        res.render('product/list', {
            list: productos,
            brands: marcas,
            cats: categorias,
            title: "Productos",
            viewCat: "products",
            style: "list.css", 
            listTitle: "Listado de productos",
            search: search
        })
    },
    create: (req,res) => {
        res.render("brands/create",{
        title: "Crear una marca",
        viewCat: "brands",
        style: "createBrands.css",
        backErrors: 0
        })
    },
    save: (req,res) => {
        const results = validationResult(req) 
        console.log(results);
        if (results.errors.length > 0) { 
            res.render("brands/create",{
                title: "Crear una marca",
                viewCat: "brands",
                style: "createBrands.css",
                errors: results.errors
            })
        } else {
            db.Brand.create({
                brand: req.body.brand,
                logo: req.file.filename 
            })
            res.redirect("/brands/")
        }
    },
    delete: (req,res) => {
        db.Brand.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/brands/")
    }
}