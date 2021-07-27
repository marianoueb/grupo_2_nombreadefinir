module.exports = {
    index: (req, res) => res.render("product/create", {
        title: "Crear producto",
        styles: "/css/createProduct.css"
    })
}