﻿const handleCreateUser = (event) => {
        event.preventDefault();

        // recopilar la informacion y mandarla al Api
        const user = {
            First_name: $("#firstName").val(),
            Last_name: $("#lastName").val(),
            Username: $("#username").val(),
            Email: $("#email").val(),
            Password: $("#password").val(),
            Phone_number: $("#phoneNumber").val(),
            Birthdate: $("#birthDate").val()
        };

        const profileImageFile = $("#profileImage")[0].files[0];
        const idImageFile = $("#idImage")[0].files[0];

        const reader = new FileReader();
        reader.onload = function () {
            user.Profile_image = reader.result.split(',')[1];

            const reader2 = new FileReader();
            reader2.onload = function () {
                user.Id_image = reader2.result.split(',')[1];

                var apiUrl = API_URL_BASE + "/api/Users/RegisterUser";

                $.ajax({
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': "application/json"
                    },
                    method: "POST",
                    url: apiUrl,
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(user),
                    hasContent: true
                }).done(function (data) {
                    if (data.errorMessage) {
                        Swal.fire({
                            title: 'Error!',
                            text: data.errorMessage,
                            icon: 'error'
                        });
                    } else {
                        Swal.fire({
                            title: 'Mensaje',
                            text: 'The User was Registered Successfully',
                            icon: 'info'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // Redirigir a la página para hacer login
                                window.location.href = "/User/Login";
                            }
                        });
                    } 
                }).fail(function (xhr, status, error) {
                    let errorMessage = "Unknown error";
                    if (jqXHR.responseJSON && jqXHR.responseJSON.error_message) {
                        errorMessage = jqXHR.responseJSON.errorMessage;
                    } else if (jqXHR.responseText) {
                        errorMessage = jqXHR.responseText;
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

            reader2.readAsDataURL(idImageFile);
        };

        reader.readAsDataURL(profileImageFile);
    };

$("#btnCreate").click(handleCreateUser);