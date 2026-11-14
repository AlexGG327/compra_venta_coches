function registrarse(nombre, email, password, latitud, longitud) {
    const info_usuario_registrarse = {
        "username": String(nombre),
        "email": String(email),
        "password": String(password),
        "latitude": Number(latitud),
        "longitude": Number(longitud)
    };

    const JSON_info_usuario = JSON.stringify(info_usuario_registrarse);
    console.log(JSON_info_usuario);

    fetch("https://practicaprogramacionweb.duckdns.org/users/register" , {
        method: "POST",
        headers: {
            'Content-Type': "application/json; charset=UTF-8"
        },
        body: JSON_info_usuario
    })
        .then(response => response.json())
        .then(data => {
            console.log("Registro completo, Respuesta del post: ", data);
        })
        .catch(error => {
            console.error("Error al registarse: ", error);
        });

        iniciar_sesion(email, password)
}

function iniciar_sesion(email, password) {
    const info_usuario_iniciar_sesion = {
        "email": String(email),
        "password": String(password),
    };

    const JSON_info_usuario = JSON.stringify(info_usuario_iniciar_sesion);
    console.log(JSON_info_usuario);

    fetch("https://practicaprogramacionweb.duckdns.org/auth/login" , {
        method: "POST",
        headers: {
            'Content-Type': "application/json; charset=UTF-8"
        },
        body: JSON_info_usuario
    })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del post: ", data);

            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", data.user);

            console.log("Token guardado: ", localStorage.getItem("token"));
        })
        .catch(error => {
            console.error("Error al iniciar sesión: ", error);
        });
}