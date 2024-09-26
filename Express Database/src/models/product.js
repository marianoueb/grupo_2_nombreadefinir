const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { query } = require('express');

const model = {
    all: async function() {
        await db.Product.findAll()
        .then(products => { return products })
        .catch(error => console.log(error))
    },
    allWithExtra: async function() {
        await db.Product.findAll({
            include: [
                {association: "Brand"},
                {association: "Categories"}
            ]})
        .then(products => { return products })
        .catch(error => console.log(error))
    },
    one: async function(id) {
        await db.Product.findByPk(id)
            .then(producto => { return producto })
            .catch(error => console.log(error));
    },
    oneWithExtra: async function(id) {
        await db.Product.findByPk(id,{
            include: [
                {association: "Brand"},
                {association: "Categories"}
            ]})
            .then(producto => { return producto })
            .catch(error => console.log(error));
    },
    new: function (data, file) {
        db.Product.create({
            name: data.name,
            description: data.description,
            price: data.price,
            brand_id: data.brand,
            category_id: data.category,
            image: file.filename 
        })
    },
    update: function (data, file, id) {
        db.Product.update({
            name: data.name,
            description: data.description,
            price: data.price,
            brand_id: data.brand,
            category_id: data.category,
            image: file.filename 
        },{
            where: {
                id: id
            }
        })
    },
    delete: function (id) {
        db.Product.destroy({
            where: {
                id: id
            }
        })
    }
/*{
    all: function() {
        const directory = path.resolve(__dirname,"../data","products.json")
        const file = fs.readFileSync(directory,"utf-8")
        const convert = JSON.parse(file)
        return convert
    },
    allWithExtra: function () {
        let products = this.all();
        products.map(element => {
            element.brand = brandModel.one(element.brand)
            return element
        }).map(element => {
            element.colors = element.colors.map(color => {
                color = colorModel.one(color)
                return color
            })
            return element
        })
        return productos;
    },
    one: function (id) {
        let productos = this.all();
        let resultado = productos.find(producto => producto.id == id)
        return resultado;
    },
    allField: function (param, value) {
        let productos = this.all();
        let resultado = [];
        for (let i = 0; i < productos.length; i++) {
            var producto = productos[i];
            if(producto[param] === value)
            resultado.push(producto)
        }
        return resultado; 
    },
    allFieldWithExtra: function (list, param, value) {
        let productos = list;
        let resultado = [];
        for (let i = 0; i < productos.length; i++) {
            var producto = productos[i];
            if(producto[param] === value)
            resultado.push(producto)
        }
        return resultado;
    },
    oneField: function (field, value) {
        let productos = this.all();
        let resultado = productos.find(producto => producto[field] === value)
        console.log(resultado);
        return resultado;
    },
    new: function (data,file) {
        const directory = path.resolve(__dirname,"../data","products.json")
        let productos = this.all();
        let nuevo = {
            id: productos.length > 0 ? productos[productos.length -1].id + 1: 1,
            name: data.name,
            description: data.description, 
            brand: data.brand,
            image: file.filename,
            price: data.price,
            category: data.category
        }    
        productos.push(nuevo)
        fs.writeFileSync(directory,JSON.stringify(productos,null,2));
        return true;    
    },
    edit: function (data,file,id) {
        const directory = path.resolve(__dirname,"../data","products.json")
        let productos = this.all();
        let updated = this.one([id]);

        productos.map(producto => {
            if(producto.id == id ){
                producto.name = data.name,
                producto.description = data.description,
                producto.brand = data.brand,
                producto.image = file.filename,
                producto.price = data.price,
                producto.category = data.category
                return producto
            }
            return producto
        })
        fs.writeFileSync(directory,JSON.stringify(productos,null,2));
        return true;
    },
   
    delete: function (id) {
        console.log("Inicio del borrado");
        const directory = path.resolve(__dirname,"../data","products.json")
        let productos = this.all();
        let deleted = this.one([id]);
        console.log("deleted", deleted);
        // eliminamos la imagen de la carpeta upload
        fs.unlinkSync(path.resolve(__dirname,"../../public/img/products",deleted.image))
        // filtarmos el producto que deaseamos eliminar
        productos = productos.filter(producto => producto.id != deleted.id )
        fs.writeFileSync(directory,JSON.stringify(productos,null,2));
        console.log("Borrado exitoso");
        return true;
    }
*/
};
module.exports = model;