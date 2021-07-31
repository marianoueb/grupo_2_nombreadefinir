module.exports = {
    index: (req, res) => res.render("product/edit", {
        title: "Editar producto",
        styles: "/css/editProduct.css"
    })
}