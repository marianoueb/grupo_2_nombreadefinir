const path = require('path');
const fs = require('fs');

const model = {
    allBrands: function() {
        const directory = path.resolve(__dirname,"../data","brands.json")
        const file = fs.readFileSync(directory,"utf-8")
        const convert = JSON.parse(file)
        return convert
    },
    allProducts: function() {
        const directory = path.resolve(__dirname,"../data","products.json")
        const file = fs.readFileSync(directory,"utf-8")
        const convert = JSON.parse(file)
        return convert
    },
    findByBrand: function (id) {
        let listaMarcas = this.allBrands();
       // let marcaFiltro = listaMarcas[id].this.one(id)
        let listaProductos = this.allProducts();
        let resultado = [];
        for( i = 0 ; i < listaProductos.length ; i++ ){
            if (listaProductos[i].brand == this.one(id)){
                resultado.push(listaProductos[i])
            }
        }
        // let resultado = listaProductos.find(producto => producto.brand == marcaFiltro)
        console.log(resultado)
        return resultado;
    },
    one: function (id) {
        let marcas = this.allBrands();
        let marca = [];
        for (let i = 0; i < marcas.length; i++) {
            if (marcas[i].id == id) {
                marca.push(marcas[i].brand)
                return marca
            }
        }
        
        console.log(marca);
        return marca.brand;
    }
}

module.exports = model;