const brandModel = require('../models/brand');

module.exports = {
    index:(req,res) => res.render("brands/list",{ // Enlista las marcas
        list: brandModel.allBrands(),
        title: "Marcas",
        styles: "/css/brandList.css"
    }),
    show: (req,res) => { // Muestra los productos de la marca seleccionada
        console.log(req.params.id);
        if( req.params.id >= 0 ){
        res.render("brands/data",{
            list: brandModel.allBrands(),
            products: brandModel.findByBrand(req.params.id),
            title: "Resultado del filtro",
            styles: "/css/brand.css"
        })}
    }
}