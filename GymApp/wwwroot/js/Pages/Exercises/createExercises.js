const handleCreateExercise = (event) => {
    event.preventDefault();

    // Recopilar la información y mandarla al API
    const exercise = {
        exerciseTypeId: $("#exercise_type_id").val(),
        name: $("#name").val(),
        description: $("#description").val(),
        primarymuscle: $("#primary_muscle").val()
    };

    const apiUrl = API_URL_BASE + "/api/Exercise/CreateExercise";

    $.ajax({
        url: apiUrl,
        method: "POST",
        hasContent: true,
        data: JSON.stringify(exercise),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
    }).done((result) => {
        console.log(result);
        Swal.fire({
            title: "Exercise Creation",
            text: "Exercise Created Successfully",
            icon: "success",
        });
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.error(textStatus, errorThrown);
        Swal.fire({
            title: "Error",
            text: "Failed to create exercise. Please try again.",
            icon: "error",
        });
    });
};

$(document).ready(() => {
    $("#createExerciseForm").on("submit", handleCreateExercise);
});
