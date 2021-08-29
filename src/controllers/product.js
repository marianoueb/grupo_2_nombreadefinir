const product = require('../models/product');

module.exports = {
    index:(req,res) => res.render("product/list",{
        list: product.all(),
        title: "Productos",
        styles: "/css/list.css",
        listTitle: "Listado de productos"
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
    },
    filter: function(req, res){
        const products = product.all();
        var filterResult = [];
        if (req.body.brand && !req.body.category) {
            const filtro = product.allField("brand", req.body.brand)
            filterResult = filtro
        }
        if (req.body.category && !req.body.brand) {
            const filtro = product.allField("category", req.body.category)
            filterResult = filtro
        }
        if (req.body.category && req.body.brand){
            var filtro1 = product.allField("brand", req.body.brand)
            var filtro2 = product.allFieldWithExtra(filtro1, "category", req.body.category)
            filterResult = filtro2
        }
        if (filterResult.length > 0){
            res.render("product/list",{
                list: filterResult,
                title: "Resultado de la busqueda",
                styles: "/css/list.css",
                listTitle: "Resultado de la busqueda"
            })
        }
        else {
            res.render("product/list",{
                list: product.all(),
                title: "Resultado de la busqueda",
                styles: "/css/list.css",
                listTitle: "No se han encontrado resultados"
            })
        }
    }
}