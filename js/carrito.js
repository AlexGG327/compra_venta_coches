
async function tabla_carrito() {
    try {

        let coches_carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        let tabla = document.getElementById("tabla_carro");

        tabla.innerHTML = "";

        coches_carrito.forEach(function(coche, indice) {

            const fila = tabla.insertRow();

            const posiciones = [coche.name, coche.price];

            posiciones.forEach(function(valor) {
                fila.insertCell().textContent = valor;
            });

            const celdaImagen = fila.insertCell();

            if (coche.image) {
                const img = document.createElement("img");
                img.src = coche.image;
                img.alt = "Imagen de " + coche.name;
                img.className = "imagen-coche";
                celdaImagen.appendChild(img);
            }

            const celdaBoton = fila.insertCell();

            const boton = document.createElement("button");
            boton.textContent = "Eliminar";
            boton.type = "button";

            boton.onclick = function() {
                eliminar_carrito(indice);
            };

            celdaBoton.appendChild(boton);

        });

    } catch (error) {
        console.error("Error:", error);
    }
}


function eliminar_carrito(indice) {

    let coches_carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    coches_carrito.splice(indice, 1);

    localStorage.setItem("carrito", JSON.stringify(coches_carrito));

    tabla_carrito();
}
function comprar(){
    try {
        const token = localStorage.getItem("token");

        let coches_carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        coches_carrito.forEach(function(coche, indice) {
            const id = coche._id;

        let url = "https://practicaprogramacionweb.duckdns.org/cars/buy/" + id

        fetch(url , {
            method: "POST",
            headers: {
                "accept": "*/*",
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"        },
                body: ""
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });




        });

    } catch (error) {
        console.error("Error:", error);
    }
}