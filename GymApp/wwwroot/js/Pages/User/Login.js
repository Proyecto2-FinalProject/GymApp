const handleLogin = (event) => {
    event.preventDefault()

    //recopilar la informacion y mandarla al Api
    var username = $("#username").val()
    var password = $("#password").val()

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
        Swal.fire({
            title: 'Mensaje',
            text: 'Welcome to the Fitness Center',
            icon: 'info'
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