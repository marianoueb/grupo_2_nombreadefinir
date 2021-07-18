module.exports = {
    index: (req, res) => res.render("index", {
        title: "Inicio",
        styles: "/css/index.css"
    })
}