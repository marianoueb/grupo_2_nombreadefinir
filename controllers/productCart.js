module.exports = {
    index: (req, res) => res.render("productCart", {
        title: "Carrito",
        styles: "/css/productCart.css"
    })
}