async function crear_tabla_mis_coches() {
    try {

        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        const respuesta = await fetch("https://practicaprogramacionweb.duckdns.org/cars", {
            headers: { Authorization: "Bearer " + token }
        });

        if (!respuesta.ok) {
            alert("Error al obtener los coches");
            return;
        }

        const coches = await respuesta.json();
        const lista = document.getElementById("tabla_mis_coches");
        lista.innerHTML = "";
    
        coches.forEach(function(coche) {
            if (coche.idUser == email){
                const fila = lista.insertRow();

                const posiciones =[coche.name, coche.price, coche.km, coche.description, coche.category, coche.state]

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
                    eliminar_coche(coche._id);
                };
                celdaBoton.appendChild(boton)
            }
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

async function eliminar_coche(id_coche){
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    let url = "https://practicaprogramacionweb.duckdns.org/cars/" + id_coche

    fetch(url, {
        method: "DELETE",
        headers: {
            "accept": "*/*",
            "Authorization": "Bearer " + token,
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
}