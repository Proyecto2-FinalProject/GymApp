const handleLogin = (event) => {
    event.preventDefault()

    //recopilar la informacion y mandarla al Api
    var username = $("#username").val()
    var password = $("#password").val()

    // Estructuramos el objeto de ResetPassword para enviar a la API
    const data = {
        username: username,
        password: password
    }

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
        data: JSON.stringify(data),
        hasContent: true
    }).done(function (data) {
        Swal.fire({
            title: 'Welcome Back',
            text: 'Fitness Center Gym',
            icon: 'success'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirigir a la página BasePage del miembro
                window.location.href = "/Member/MemberPage";
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
}


$("#btnLogin").click(handleLogin)