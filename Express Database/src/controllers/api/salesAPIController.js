const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { query } = require('express');
const { validationResult } = require("express-validator")

module.exports = {
    buyers: async (req, res) => {
        let users = await db.User.findAll().then(list => {return list}).catch(err => {console.log(err)})
        db.Cart.findAll({
            include: [
                {association: "Orders", include: ["Products"]},
                {association: "Users"}
            ],
            where: {
                status: 0
            },
            attributes: {
                include: [
                [
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM Carts 
                        WHERE Carts.user_id = Users.id AND Carts.status = 0
                    )`),
                    'CartCount'
                ]
            ]},
            group: ["user_id"]
        })  
            .then(cart => {
                let data = {
                    totalBuyers: cart.length,
                    totalUsers: users.length
                }
                return data
            })
            .then(resp => res.json(resp))
    },
    products: async (req, res) => {
        // Traigo un listado limpio de ordenes con su relación de carritos
        let orders = await db.Order.findAll({
            include: [
                {association: "Carts"}
            ]}).then(list => {return list}).catch(err => {console.log(err)})

        // Procedo a filtrar las ordenes de los carritos que estén completados
        let select = orders.filter(order => order.Carts.status == 0)

        let selectIds = [] // Acumulador para lo siguiente

        // Necesito una herramienta para agregar al WHERE de la orden principal
        // Creo el array con los ID de las ordenes pertenecientes a carritos completados
        for (let i = 0; i < select.length; i++) {
            const element = select[i];
            selectIds.push(element.id)
        }

        // Como necesito CONTAR productos y si uso attributes, no incluye otro where en la
        // cuenta de productos, necesito crear la sintaxis MySQL para agregarla manualmente
        // al attributes
        let sqlSyntax = ""; // Acumulador vacio
        for (let i = 0; i < selectIds.length; i++) {
            const element = selectIds[i];
            if (sqlSyntax == "") { // Si el acumulador está vacío, empiezo con la sintaxis
                sqlSyntax = sqlSyntax + "Orders.id = " + element
            } else { // Si ya tiene contenido, agrego un OR antes y sigo agregando
                sqlSyntax = sqlSyntax + " OR Orders.id = " + element
            }
        }

        // Finalmente traigo el pedido que realmente voy a usar para mostrar mis datos
        db.Order.findAll({
            include: [
                {association: "Carts"}, 
                {association: "Products"}
            ],
            attributes: {
                include: [
                [ /* Si uso un where fuera del attributes, el sequelize.literal lo ignora */
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM Orders 
                        WHERE (`+ sqlSyntax +`) AND Orders.product_id = Products.id 
                    )`), // Arriba procedo a introducir mi sintaxis propia entre parentesis
                    'Count' // seguida de lo que realmente quiero contar
                ]
            ]},
            group: ["product_id"] // Finalmente agrupo los productos por su ID
        })
            .then(order => {
                let data = [];
                for (let i = 0; i < order.length; i++) {
                    const element = order[i];
                    if (element.Carts.status == 0) {
                        let prod = {
                            product: element.Products.name,
                            count: element.dataValues.Count,
                            percent: element.dataValues.Count / orders.length
                        }
                        data.push(prod);
                    }
                }
                orders = orders.filter(order => order.Carts.status == 0)
                let respuesta = {
                    totalOrders: orders.length,
                    everyOrder: data
                }
                
                return respuesta
            })
            .then(resp => res.json(resp))
    },
    topBought: (req, res) => {
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
            limit: 5,
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
    topBuyers: (req, res) => {
        db.Cart.findAll({
            include: [
                {association: "Users"},
            ],
            where: {
                status: 0
            },
            attributes: {
                include: [
                [
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM Carts 
                        WHERE Carts.user_id = Users.id AND Carts.status = 0
                    )`),
                    'CartCount'
                ]
            ]},
            group: ["user_id"]
        })  
            .then(respArray => {
            let userList = [];
            let salesAcc = 0;
            for (let i = 0; i < respArray.length; i++) {
                const element = respArray[i]; 
                console.log(element.dataValues.CartCount);
                let cartCount = element.dataValues.CartCount;
                salesAcc = salesAcc + cartCount;
                userList.push(element.Users);
            }
            let respuesta = {
                meta: {
                    status : 200,
                    buyers: userList,
                    sales: salesAcc,
                    url: '/api/products/sales'
                },
                data: respArray
            }
                res.json(respuesta);
            })
            .catch(error => console.log(error))
    }
}