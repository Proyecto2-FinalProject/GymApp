const loadExercises = () => {
    $.ajax({
        url: "/api/Exercise/GetAllExercises",
        method: "GET",
        dataType: "json",
    }).done((result) => {
        const exerciseSelect = $("#exercise_id");
        exerciseSelect.empty();

        result.forEach(exercise => {
            exerciseSelect.append(`<option value="${exercise.exerciseId}">${exercise.name}</option>`);
        });
    }).fail((jqXHR, textStatus, errorThrown) => {
        Swal.fire({
            title: "Error",
            text: "Failed to load exercises. Please try again.",
            icon: "error",
        });
    });
};

const handleSelectExercises = (event) => {
    event.preventDefault();

    const routineExercise = {
        routineId: $("#routine_id").val(),
        exerciseId: $("#exercise_id").val(),
        exerciseType: $("#exercise_type").val(),
        sets: $("#sets").val(),
        repetitions: $("#repetitions").val(),
        weight: $("#weight").val(),
        timeDuration: $("#time_duration").val(),
        amrapTime: $("#amrap_time").val()
    };

    $.ajax({
        url: "/api/RoutineExercise/AddExercise",
        method: "POST",
        data: JSON.stringify(routineExercise),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
    }).done((result) => {
        Swal.fire({
            title: "Exercise Added",
            text: result.message,
            icon: "success",
        }).then(() => {
            // Optionally refresh the list of exercises or perform another action
        });
    }).fail((jqXHR, textStatus, errorThrown) => {
        Swal.fire({
            title: "Error",
            text: "Failed to add exercise. Please try again.",
            icon: "error",
        });
    });
};

$(document).ready(() => {
    loadExercises();
    $("#selectExercisesForm").on("submit", handleSelectExercises);
});
