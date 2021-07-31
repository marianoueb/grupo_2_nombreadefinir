const product = require('../models/product');

module.exports = {
    index:(req,res) => res.render("product/list",{
        list: product.all(),
        title: "Productos",
        styles: "/css/list.css"
    }),
    show: (req,res) => {
        if( req.params.id >= 0 ){
        res.render("product/detail",{
            list: product.all(),
            product: product.one(req.params.id),
            title: "Detalle del producto",
            styles: "/css/productDetails.css"
        })}
    }
    ,
    create: (req,res) => {
        res.render("product/create",{
        title: "Crear un producto",
        styles: "/css/createProduct.css"
    })
    },
    save: (req,res) => {
        let result = product.new(req.body,req.file)
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion") 
    },
    edit: (req,res) => {
        let id = req.params.id;
        res.render("product/edit",{
            title: "Editar el producto",
            styles: "/css/createProduct.css",
            product: product.one(req.params.id)
        })
    },
    update: (req,res) =>{
        const id = req.params.id;
        console.log(req.params.id);
        console.log("Iniciando edición de producto")
        let result = product.edit(req.body,req.file,req.params.id)
        console.log("Finalizando edición");
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion") 
    },
    delete: (req,res) => {
        const id = req.params.id;
        console.log("id" + req.params.id);
        let result = product.delete(id);
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion") 
    }
}