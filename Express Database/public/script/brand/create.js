window.addEventListener("load",function (){
    let button = document.querySelector("#submit");
    let form = document.querySelector("#brandcreate");
    let error = document.querySelector(".error-div");
    let brand = document.querySelector("#brand");
    let logo = document.querySelector("#logo");

    form.addEventListener("submit", function (event) { 
        event.preventDefault(); 
        console.clear();
        console.log(brand);
        let errores = [];
        if (brand.value.length < 1) {
            errores.push("El campo de marca debe estar completo");
        }
        if (logo.value.length < 1) {
            errores.push("Debes subir un logo");
        } else if (!/^.*\.(jpg|JPG|gif|GIF|jpeg|JPEG|png|PNG)$/.test(logo.value)) {
            errores.push("El logo debe estar en formato .jpg, .png o .gif");
        }
        console.log(errores);
        
        if (errores.length > 0) {
            error.innerHTML = ""
            for (let i = 0; i < errores.length; i++) {
                const err = errores[i];
                console.log(err);
                error.innerHTML += "<h2 class='frontError'> - " + err + "</h2>"
                error.classList.add("error-span")
            }
        } else {
            form.submit();
        }
    })
})