module.exports = {
    index: (req, res) => res.render("index", {
        title: "Inicio",
        viewCat: "default",
        style: "index.css"
    }),
    home: (req,res) => {
        res.redirect("/")
      }
}