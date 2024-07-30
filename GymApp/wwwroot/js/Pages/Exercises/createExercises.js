document.addEventListener('DOMContentLoaded', function () {

    // Obtener todos los ejercicios
    fetch(API_URL_BASE + "/api/ExerciseType/GetAllExerciseTypes")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const createExercises = document.getElementById('exercise_id');
            if (createExercises) {
                data.forEach(exerciseType => {
                    const option = document.createElement('option');
                    option.value = exerciseType.exerciseTypeId; // Asegúrate de que este campo corresponda a la propiedad id de tu modelo
                    option.textContent = exerciseType.typeName; // Asegúrate de que este campo corresponda a la propiedad name de tu modelo
                    createExercises.appendChild(option);
                });
            } else {
                console.error('Element with ID "exercise_id" not found');
            }
        })
        .catch(error => {
            console.error('Error fetching exercises:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to fetch exercises. Please try again.',
                icon: 'error'
            });
        });
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
