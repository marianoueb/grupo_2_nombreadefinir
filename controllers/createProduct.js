module.exports = {
    index: (req, res) => res.render("createProduct", {
        title: "Crear producto",
        styles: "/css/createProduct.css"
    })
}