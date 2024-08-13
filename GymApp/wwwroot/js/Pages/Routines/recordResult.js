document.addEventListener("DOMContentLoaded", function () {
    const routineId = getRoutineIdFromUrl();
    document.getElementById("routine_id").value = routineId;
    fetchExercisesForRoutine(routineId);

    // Manejar el envío del formulario
    document.getElementById("recordResultsForm").addEventListener("submit", function (event) {
        event.preventDefault();
        submitResults();
    });
});

function getRoutineIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("routineId");
}

function fetchExercisesForRoutine(routineId) {
    const apiUrl = "https://localhost:7280/api/Routine/GetExercisesForRoutine?routineId=" + routineId;
    fetch(apiUrl)
        .then(response => response.json())
        .then(exercises => {
            populateExerciseSelect(exercises);
        })
        .catch(error => console.error("Error fetching exercises:", error));
}

function populateExerciseSelect(exercises) {
    const selectElement = document.getElementById("exercise_id");
    selectElement.innerHTML = ""; // Limpiar opciones actuales

    exercises.forEach(exercise => {
        const option = document.createElement("option");
        option.value = exercise.exerciseId;
        option.textContent = exercise.exerciseName;
        selectElement.appendChild(option);
    });

    // Manejar el cambio de selección del ejercicio
    selectElement.addEventListener("change", function () {
        const selectedExerciseId = this.value;
        console.log("Selected exercise ID:", selectedExerciseId); // Depuración
        const selectedExercise = exercises.find(exercise => exercise.exerciseId == selectedExerciseId);
        if (selectedExercise) {
            document.getElementById("exercise_type_id").value = selectedExercise.exerciseTypeId;
        }
    });
}

function submitResults() {
    const formData = new FormData(document.getElementById("recordResultsForm"));

    // Formatear el tiempo a HH:MM:SS
    let timeDuration = formData.get("time_duration");
    if (timeDuration && timeDuration.split(':').length === 2) {
        timeDuration += ":00"; // Añadir segundos si no están presentes
    }

    const data = {
        routineId: formData.get("routine_id"),
        exerciseId: formData.get("exercise_id"),
        setsCompleted: formData.get("sets_completed") || null,
        repetitionsCompleted: formData.get("repetitions_completed") || null,
        weightUsed: formData.get("weight_used") || null,
        timeDuration: timeDuration || null,
        amrapTime: formData.get("amrap_time") || null,
        resultDate: new Date().toISOString()
    };

    console.log("Form data to submit:", data); // Depuración

    fetch("https://localhost:7280/api/Routine/SubmitResults", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert(result.message);
            } else {
                alert("Error: " + result.message);
            }
        })
        .catch(error => console.error("Error submitting results:", error));
}


