async function obtener_datos_coches() {
    const token = localStorage.getItem("token");
    //console.log(token);

    try {
        const respuesta = await fetch("https://practicaprogramacionweb.duckdns.org/cars", {
            method: "GET",
            headers: {
                "accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        });
        const datos_coches = await respuesta.json();

        return datos_coches;
    } 
    
    catch(error) {
        console.error("Error en la petición", error);
    }
}

async function crear_tabla_todos_los_coches() {
    let datos_coches = await obtener_datos_coches();
    console.log(datos_coches);
    const mi_tabla = document.querySelector('#tabla_todos_los_coches tbody');

    datos_coches.forEach(coche => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${coche.name}</td>
            <td>${coche.price}</td>
            <td>${coche.km}</td>
            <td>${coche.description}</td>
            <td>${coche.category}</td>
            <td><img src="${coche.image}" ></td>
            <td>${coche.state}</td>
            <td><button type="button" onclick="añadir_al_carrito()">Comprar</button></td>
        `;
        mi_tabla.appendChild(fila);
    })
    //new DataTable('#tabla_mis_coches');
}

