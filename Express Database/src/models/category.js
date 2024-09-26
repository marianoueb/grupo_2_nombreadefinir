const path = require('path');
const fs = require('fs');

const model = {
    allCats: function() {
        const directory = path.resolve(__dirname,"../data","categories.json")
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
    findByCat: function (id) { 
        let listaCategorias = this.allCats();
       // let categoriaFiltro = listaCategorias[id].this.one(id)
        let listaProductos = this.allProducts();
        let resultado = [];
        for( i = 0 ; i < listaProductos.length ; i++ ){
            if (listaProductos[i].category == this.one(id)){
                resultado.push(listaProductos[i])
            }
        }
        // let resultado = listaProductos.find(producto => producto.brand == marcaFiltro)
        console.log(resultado)
        return resultado;
    },
    one: function (id) {
        let categorias = this.allCats();
        let categoria = [];
        for (let i = 0; i < categorias.length; i++) {
            if (categorias[i].id == id) {
                categoria.push(categorias[i].category)
                return categoria
            }
        }
        
        console.log(categoria);
        return categoria.category;
    }
}

module.exports = model;