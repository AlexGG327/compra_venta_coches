async function cargar_navbar() {

    const respuesta = await fetch("navbar.html");

    const navbar = await respuesta.text();

    document.querySelector("#navbar").innerHTML = navbar;

}

cargar_navbar();