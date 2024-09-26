window.addEventListener("load",function (){
    let button = document.querySelector("#submit");
    let form = document.querySelector("#registerform");
    let error = document.querySelector(".error-div");
    let name = document.querySelector("#name");
    let surname = document.querySelector("#surname");
    let email = document.querySelector("#email");
    let avatar = document.querySelector("#avatar");
    let tel = document.querySelector("#tel");
    let password = document.querySelector("#password");

    form.addEventListener("submit", function (event) { 
        event.preventDefault(); 
        console.clear();
        console.log(name);
        let errores = [];
        if (name.value.length < 1) {
            errores.push("El campo de nombre debe estar completo");
        } else if (name.value.length > 0 && name.value.length < 2){
            errores.push("El nombre debe tener al menos 2 caracteres");
        }
        if (surname.value.length < 1) {
            errores.push("El campo de apellido debe estar completo");
        } else if (surname.value.length > 0 && surname.value.length < 2){
            errores.push("El apellido debe tener al menos 2 caracteres");
        }
        if (password.value.length < 1) {
            errores.push("El campo de contraseña debe estar completo");
        } else if (password.value.length > 0 && password.value.length < 8){
            errores.push("La contraseña debe tener al menos 8 caracteres");
        } else if (!/^(?=.*[A-Z])(?=.*[!@#$&*\?\¿\-\_\"\.\:\;\,])(?=.*[0-9])(?=.*[a-z]).{8,}/.test(password.value)){
            errores.push("La contraseña debe estar compuesta por al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un caracter especial");
        }
        if (tel.value.length < 1) {
            errores.push("El campo de teléfono debe estar completo");
        } else if (!/^[0-9]*$/.test(tel.value)){
            errores.push("El telefono debe estar en formato numérico");
        } else if (tel.value.length < 10) {
            errores.push("El teléfono debe tener al menos 10 caracteres");
        }
        if (email.value.length < 1) {
            errores.push("El campo de email debe estar completo");
        } else if (!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email.value)){
            errores.push("El email debe estar en el formato correcto");
        }
        if (avatar.value.length < 1) {
            errores.push("Debes subir una imagen de perfil");
        } else if (!/^.*\.(jpg|JPG|gif|GIF|jpeg|JPEG|png|PNG)$/.test(avatar.value)) {
            errores.push("La foto del producto debe estar en formato .jpg, .png o .gif");
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