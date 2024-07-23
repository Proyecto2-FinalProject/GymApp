const handleCreateRoutine = (event) => {
    event.preventDefault();

    // Recopilar la información y mandarla al API
    const routine = {
        instructorname: $("#instructor_name").val(),
        exercisename: $("#exercise_name").val(),
        exercisetype: $("#exercise_type").val(),
        sets: $("#sets").val(),
        weight: $("#weight").val(),
        timeduration: $("#time_duration").val(),
        machine: $("#machine").val()
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
        console.log(result);
        Swal.fire({
            title: "Routine Creation",
            text: "Routine Created Successfully",
            icon: "success",
        });
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.error(textStatus, errorThrown);
        Swal.fire({
            title: "Error",
            text: "Failed to create routine. Please try again.",
            icon: "error",
        });
    });
};

$(document).ready(() => {
    $("#createRoutineForm").on("submit", handleCreateRoutine);
});
