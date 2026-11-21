async function agregar_coches(modelo, precio, km, descripcion, categoria, imagen){
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const info_nuevo_coche = {
        "name": String(modelo),
        "price": Number(precio),
        "km": Number(km),
        "category": String(categoria),
        "description": String(descripcion),
        "image":String(imagen),
        "idUser": String(email)
    };

    const JSON_info_nuevo_coche = JSON.stringify(info_nuevo_coche);

    fetch("https://practicaprogramacionweb.duckdns.org/cars" , {
        method: "POST",
        headers: {
            "accept": "*/*",
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"        },
        body: JSON_info_nuevo_coche
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });

}