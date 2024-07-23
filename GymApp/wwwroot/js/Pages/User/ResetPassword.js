const handleResetPassword = (event) => {
    event.preventDefault();

    // Obtiene el email y se lo manda al Api 
    const email = $("#email").val()

    var apiUrl = API_URL_BASE + "/api/Messages/SendResetPasswordEmail";

            $.ajax({
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: "POST",
                url: apiUrl,
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                data: JSON.stringify(email),
                hasContent: true
            }).done(function (data) {
                Swal.fire({
                    title: 'Mensaje',
                    text:   "We've sent you an email with instructions.'",
                    icon: 'info'
                });
            }).fail(function (xhr, status, error) {
                let errorMessage = "Unknown error";
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMessage = xhr.responseJSON.message;
                } else if (xhr.responseText) {
                    errorMessage = xhr.responseText;
                } else if (error) {
                    errorMessage = error;
                }
                Swal.fire({
                    title: 'Error!',
                    text: errorMessage,
                    icon: 'error'
                });
            });
};

$("#btnResetPassword").click(handleResetPassword);