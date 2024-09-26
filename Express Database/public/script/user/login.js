window.addEventListener("load",function (){
    let button = document.querySelector("#submit");
    let form = document.querySelector("#formlogin");
    let error = document.querySelector(".error-div");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    
    form.addEventListener("submit", function (event) { 
        console.log(error);
        event.preventDefault(); 
        console.clear();
        let errores = [];

        if (password.value.length < 1) {
            errores.push("El campo de contraseña debe estar completo");
        }

        if (email.value.length < 1) {
            errores.push("El campo de email debe estar completo");
        } else if (!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email.value)){
            errores.push("El email debe estar en el formato correcto");
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