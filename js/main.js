function crear_tabla_todos_los_coches() {
    const token = localStorage.getItem("token");
    console.log(token);

    fetch("https://practicaprogramacionweb.duckdns.org/cars")
        .then(response => response.json())
        .then(coches => {
            const mi_tabla = document.querySelector('#tabla_todos_los_coches tbody');

            coches.forEach(coche => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${coches.name}</td>
                <td>${coches.price}</td>
                <td>${coches.km}</td>
                <td>${coches.category}</td>
                <td>${coches.description}</td>
                <td>${coches.image}</td>
            `;
            mi_tabla.appendChild(fila);
        })
        .catch(error => {
            console.error("Error en la petición", error);
        });

        new DataTable('#tabla_todos_los_coches')
        })
}