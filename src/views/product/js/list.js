function mil(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let precio = document.querySelectorAll(".precio-producto")
console.log(precio);
for (let i = 0; i < precio.length; i++) {
    //const numero = precio[i].innerHTML;
    //let valor = parseInt(numero)
    
    console.log(mil(precio[i]));
}