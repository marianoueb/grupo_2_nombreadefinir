const catModel = require('../models/category');

module.exports = {
    index:(req,res) => res.render("categories/list",{ // Enlista las categorías
        list: catModel.allCats(),
        title: "Categorías",
        styles: "/css/index.css" 
    }),
    show: (req,res) => { // Muestra los productos de la categoría seleccionada
        console.log(req.params.id);
        if( req.params.id >= 0 ){
        res.render("categories/data",{
            list: catModel.allCats(),
            products: catModel.findByCat(req.params.id),
            title: "Resultado del filtro",
            styles: "/css/category.css"
        })}
    }
}