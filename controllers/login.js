module.exports = {
    index: (req, res) => res.render("login", {
        title: "Ingreso",
        styles: "/css/login.css"
    })
}