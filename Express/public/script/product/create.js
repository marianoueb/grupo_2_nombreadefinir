window.addEventListener("load",function (){
    let button = document.querySelector("#submit");
    let form = document.querySelector("#createform");
    let error = document.querySelector(".error-div");
    let name = document.querySelector("#name");
    let description = document.querySelector("#description");
    let productImage = document.querySelector("#productImage");
    let price = document.querySelector("#price");

    form.addEventListener("submit", function (event) { 
        event.preventDefault(); 
        console.clear();
        console.log(name);
        let errores = [];
        if (name.value.length < 1) {
            errores.push("El campo de nombre debe estar completo");
        } else if (name.value.length > 0 && name.value.length < 5){
            errores.push("El nombre debe tener al menos 5 caracteres");
        }
        if (description.value.length < 1) {
            errores.push("El campo de descripción debe estar completo");
        } else if (description.value.length > 0 && description.value.length < 20){
            errores.push("La descripción debe tener al menos 20 caracteres");
        }
        if (price.value.length < 1) {
            errores.push("El campo de precio debe estar completo");
        } else if (!/^[0-9]*$/.test(price.value)){
            errores.push("El precio debe estar en formato numérico");
        }
        if (productImage.value.length < 1) {
            errores.push("Debes subir una imagen del producto");
        } else if (!/^.*\.(jpg|JPG|gif|GIF|jpeg|JPEG|png|PNG)$/.test(productImage.value)) {
            errores.push("La foto del producto debe estar en formato .jpg, .png o .gif");
        }
        console.log(`${/^\d+$/.test(price.value)}`)
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