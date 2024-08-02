const handleCreateRoutine = (event) => {
    event.preventDefault();

    // Recopilar la información y mandarla al API
    const routine = {
        memberId: $("#member_id").val(),
        instructorId: $("#instructor_id").val(),
        measurementAppointmentId: $("#measurement_appointment_id").val(),
        name: $("#name").val(),
        description: $("#description").val(),
        creationDate: $("#creation_date").val()
    };

    const apiUrl = API_URL_BASE + "/api/Routine/CreateRoutine";

    $.ajax({
        url: apiUrl,
        method: "POST",
        hasContent: true,
        data: JSON.stringify(routine),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
    }).done((result) => {
        if (result.success && result.routineId) {
            Swal.fire({
                title: "Routine Creation",
                text: "Routine Created Successfully",
                icon: "success",
            }).then(() => {
                window.location.href = `/Exercise/Select?routineId=${result.routineId}`;
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "Failed to get routine ID. Please try again.",
                icon: "error",
            });
        }
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.error(textStatus, errorThrown);
        Swal.fire({
            title: "Error",
            text: "Failed to create Routine. Please try again.",
            icon: "error",
        });
    });
