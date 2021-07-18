module.exports = {
    index: (req, res) => res.render("editProduct", {
        title: "Editar producto",
        styles: "/css/editProduct.css"
    })
}