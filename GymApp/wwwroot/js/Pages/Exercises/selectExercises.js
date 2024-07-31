document.addEventListener('DOMContentLoaded', function () {
    // Obtener todos los ejercicios
    fetch(API_URL_BASE + "/api/Exercise/GetAllExercises")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const exerciseSelect = document.getElementById('exercise_id');
            if (exerciseSelect) {
                data.forEach(exercise => {
                    const option = document.createElement('option');
                    option.value = exercise.exerciseId; // Asigna el ID del ejercicio
                    option.textContent = exercise.name; // Asigna el nombre del ejercicio
                    option.dataset.type = exercise.exerciseType; // Asigna el tipo de ejercicio
                    exerciseSelect.appendChild(option);
                });

                // Configurar el manejador del cambio de selección
                exerciseSelect.addEventListener('change', function () {
                    const selectedOption = exerciseSelect.options[exerciseSelect.selectedIndex];
                    const exerciseType = selectedOption.dataset.type;

                    // Establecer el tipo de ejercicio en el campo correspondiente
                    document.getElementById('exercise_type').value = exerciseType;

                    // Actualizar la habilitación y deshabilitación de los campos
                    updateFields(exerciseType);
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

    function updateFields(exerciseType) {
        const setsInput = document.getElementById('sets');
        const repetitionsInput = document.getElementById('repetitions');
        const weightInput = document.getElementById('weight');
        const timeDurationInput = document.getElementById('time_duration');
        const amrapTimeInput = document.getElementById('amrap_time');

        // Reset all fields
        setsInput.disabled = false;
        repetitionsInput.disabled = false;
        weightInput.disabled = false;
        timeDurationInput.disabled = false;
        amrapTimeInput.disabled = false;

        // Disable fields based on exercise type
        if (exerciseType === 'weight-based') {
            timeDurationInput.value = '';
            amrapTimeInput.value = '';
            timeDurationInput.disabled = true;
            amrapTimeInput.disabled = true;
        } else if (exerciseType === 'time-based') {
            setsInput.value = '';
            repetitionsInput.value = '';
            weightInput.value = '';
            setsInput.disabled = true;
            repetitionsInput.disabled = true;
            weightInput.disabled = true;
        } else if (exerciseType === 'amrap') {
            setsInput.value = '';
            repetitionsInput.value = '';
            weightInput.value = '';
            setsInput.disabled = true;
            repetitionsInput.disabled = true;
            weightInput.disabled = true;
            timeDurationInput.disabled = true;
        }
    }
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
    