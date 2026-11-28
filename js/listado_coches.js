let todos_los_coches = []

async function recibir_coches() {
    try {

        const token = localStorage.getItem("token");

        const respuesta = await fetch("https://practicaprogramacionweb.duckdns.org/cars", {
            headers: { Authorization: "Bearer " + token }
        });

        if (!respuesta.ok) {
            alert("Error al obtener los coches");
            return;
        }

        const coches = await respuesta.json();
        todos_los_coches = coches;

        crear_tabla_coches(coches);
        iniciar_datatable();
    }

    catch (error) {
        console.error("Error:", error);
    }
}

function crear_tabla_coches(coches) {

    const lista = document.getElementById("tabla_todos_los_coches");
    lista.innerHTML = "";

    coches.forEach(function(coche) {
        const fila = lista.insertRow();

        const posiciones =[coche.name, coche.price + " €", coche.km + " km", coche.description, coche.category, coche.state]

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

        if (coche.state == "En venta") {
            const celdaBoton = fila.insertCell();
            const boton = document.createElement("button");
            boton.className = "boton-carrito";
            boton.textContent = "Añadir al carrito";
            boton.type = "button";
            boton.className = "boton-carrito";

            boton.onclick = function() {
                carrito(coche);
            };

            celdaBoton.appendChild(boton);
        }

        else {
            const celdaBoton = fila.insertCell();
            const div = document.createElement("div");
            div.className = "boton-carrito";
            div.textContent = "No se puede comprar";

            celdaBoton.appendChild(div);
        }
    });
}

//import {carrito} from "./carrito.js";

function carrito(coche) {

    let coches_carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    coches_carrito.push(coche);

    localStorage.setItem("carrito", JSON.stringify(coches_carrito));

    alert("Coche añadido al carrito");
    
}

function buscador() {

    const nombre = document.getElementById("nombre_coche").value.toLowerCase();

    const coches_filtrados = todos_los_coches.filter(function(coche) {

        return coche.name.toLowerCase().includes(nombre);

    });

    crear_tabla_coches(coches_filtrados);
}

let datatable;

function iniciar_datatable() {

    if (datatable) {
        datatable.destroy();
    }

    datatable = new DataTable("#tabla_coches", {
        paging: false,
        searching: false,

        order: [[1, "asc"]],

        columnDefs: [
            {
                targets: [0, 3, 4, 5, 6, 7],
                orderable: false
            }
        ],

        language: {
        
            emptyTable: "No hay coches disponibles",
            zeroRecords: "No se encontraron coches"
        }
    });
}