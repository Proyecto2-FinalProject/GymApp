document.addEventListener('DOMContentLoaded', function () {
    // Obtener el ID de la rutina desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const routineId = urlParams.get('routineId');

    if (!routineId) {
        console.error('Routine ID not found in the URL');
        return;
    }

    // Obtener los ejercicios de la rutina
    fetch(`https://localhost:7280/api/Routine/GetExercisesForRoutine?routineId=${routineId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const exerciseSelect = document.getElementById('exercise_id');
            if (exerciseSelect) {
                data.forEach(exercise => {
                    const option = document.createElement('option');
                    option.value = exercise.exerciseId;
                    option.textContent = exercise.name;
                    option.dataset.type = exercise.exerciseTypeId;
                    exerciseSelect.appendChild(option);
                });
            } else {
                console.error('Element with ID "exercise_id" not found');
            }
        })
        .catch(error => {
            console.error('Error fetching exercises for the routine:', error);
        });

    // Manejar el cambio de selección del ejercicio
    document.getElementById('exercise_id').addEventListener('change', function () {
        const selectedOption = this.options[this.selectedIndex];
        const exerciseTypeId = selectedOption.dataset.type;
        const exerciseTypeIdInput = document.getElementById('exercise_type_id');

        if (exerciseTypeIdInput) {
            exerciseTypeIdInput.value = exerciseTypeId;
            toggleFieldsBasedOnType(exerciseTypeId);
        } else {
            console.error('Element with ID "exercise_type_id" not found');
        }
    });

    // Función para habilitar/deshabilitar campos según el tipo de ejercicio
    function toggleFieldsBasedOnType(exerciseTypeId) {
        const timeDurationField = document.getElementById('time_duration');
        const amrapTimeField = document.getElementById('amrap_time');
        const setsField = document.getElementById('sets_completed');
        const repetitionsField = document.getElementById('repetitions_completed');
        const weightField = document.getElementById('weight_used');

        // Resetear los campos
        timeDurationField.disabled = false;
        amrapTimeField.disabled = false;
        setsField.disabled = false;
        repetitionsField.disabled = false;
        weightField.disabled = false;

        switch (parseInt(exerciseTypeId)) {
            case 1: // Weight-Based
                timeDurationField.disabled = true;
                amrapTimeField.disabled = true;
                break;
            case 2: // Time-Based
                setsField.disabled = true;
                repetitionsField.disabled = true;
                weightField.disabled = true;
                amrapTimeField.disabled = true;
                break;
            case 3: // AMRAP
                setsField.disabled = true;
                repetitionsField.disabled = true;
                weightField.disabled = true;
                timeDurationField.disabled = true;
                break;
            default:
                console.warn('Unknown exercise type ID:', exerciseTypeId);
                break;
        }
    }
});
