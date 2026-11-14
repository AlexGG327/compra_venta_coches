function crear_tabla_todos_los_coches() {
    const token = localStorage.getItem("token");
    console.log(token);

    fetch("https://practicaprogramacionweb.duckdns.org/cars", {
        method: "GET",
        headers: {
            "accept": "*/*",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(coches => {
            console.log(coches)
            const mi_tabla = document.querySelector('#tabla_todos_los_coches tbody');

            coches.forEach(coche => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${coche.name}</td>
                    <td>${coche.price}</td>
                    <td>${coche.km}</td>
                    <td>${coche.description}</td>
                    <td>${coche.category}</td>
                    <td><img src="${coche.image}" ></td>
                    <td>${coche.state}</td>
                `;
                mi_tabla.appendChild(fila);
            })
        .catch(error => {
            console.error("Error en la petición", error);
        });

        new DataTable('#tabla_todos_los_coches')
        })
}


async function crear_tabla_mis_coches() {
    let datos_coches = await obtener_datos_coches();
    console.log(datos_coches);
    const mi_tabla = document.querySelector('#tabla_todos_los_coches tbody');

    datos_coches.forEach(coche => {
        if (coche._id == localStorage.getItem("user")) {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${coche.name}</td>
                <td>${coche.price}</td>
                <td>${coche.km}</td>
                <td>${coche.description}</td>
                <td>${coche.category}</td>
                <td><img src="${coche.image}" ></td>
                <td>${coche.state}</td>
                <td><button type="button" onclick="comprar_coche()">Comprar</button></td>
            `;
            mi_tabla.appendChild(fila);
        }
    })
    //new DataTable('#tabla_todos_los_coches');
}

function añadir_al_carrito() {}