module.exports = {
    index: (req, res) => res.render("productDetails", {
        title: "Detalle del producto",
        styles: "/css/productDetails.css"
    })
}