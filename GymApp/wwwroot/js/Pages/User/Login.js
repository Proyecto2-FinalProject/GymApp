const handleLogin = (event) => {
    event.preventDefault();

    // Recopilar la información y enviarla al API
    var username = $("#username").val();
    var password = $("#password").val();

    var apiUrl = API_URL_BASE + "/api/Users/Login";

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        method: "POST",
        url: apiUrl,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ username: username, password: password }),
        hasContent: true
    }).done(function (data) {
        console.log(data);  // Agrega esta línea para depuración
        Swal.fire({
            title: 'Welcome Back',
            text: 'Fitness Center Gym',
            icon: 'success'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirigir a la página basada en el rol del usuario
                switch (data.role) {
                    case 'Administrador':
                        window.location.href = "/Admin/AdminPage";
                        break;
                    case 'Entrenador':
                        window.location.href = "/Trainer/TrainerPage";
                        break;
                    case 'Recepcionista':
                        window.location.href = "/Receptionist/ReceptionistPage";
                        break;
                    case 'Usuario':
                        window.location.href = "/Member/MemberPage";
                        break;
                    default:
                        window.location.href = "/Default/DefaultPage";
                        break;
                }
            }
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // Extraer información de error y mostrarla
        var errorMessage = "Unknown error";
        if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
            errorMessage = jqXHR.responseJSON.message;
        } else if (jqXHR.responseText) {
            errorMessage = jqXHR.responseText;
        } else if (errorThrown) {
            errorMessage = errorThrown;
        }

        Swal.fire({
            title: 'Error!',
            text: errorMessage,
            icon: 'error'
        });
    });
};

$("#btnLogin").click(handleLogin);