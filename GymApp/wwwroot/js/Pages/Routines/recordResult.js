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
    const apiUrl = API_URL_BASE + "/api/Routine/GetExercisesForRoutine?routineId=" + routineId;
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
        option.textContent = exercise.ExerciseName;
        selectElement.appendChild(option);
    });

    // Manejar el cambio de selección del ejercicio
    selectElement.addEventListener("change", function () {
        const selectedExerciseId = this.value;
        const selectedExercise = exercises.find(exercise => exercise.exerciseId == selectedExerciseId);
        if (selectedExercise) {
            document.getElementById("exercise_type_id").value = selectedExercise.exerciseTypeId;
            handleExerciseTypeChange(selectedExercise.exerciseTypeId);
        }
    });
}

function handleExerciseTypeChange(exerciseTypeId) {
    const exerciseType = getExerciseTypeById(exerciseTypeId); // Suponiendo que tienes una función para obtener el tipo de ejercicio
    const timeDurationField = document.getElementById("time_duration");
    const amrapTimeField = document.getElementById("amrap_time");

    switch (exerciseType) {
        case "AMRAP":
            timeDurationField.disabled = true;
            amrapTimeField.disabled = false;
            break;
        case "Time-Based":
            timeDurationField.disabled = false;
            amrapTimeField.disabled = true;
            break;
        case "Weight-Based":
            timeDurationField.disabled = true;
            amrapTimeField.disabled = true;
            break;
        default:
            timeDurationField.disabled = false;
            amrapTimeField.disabled = false;
            break;
    }
}

function getExerciseTypeById(exerciseTypeId) {
    // Deberías tener un objeto o lista con los tipos de ejercicio
    const exerciseTypes = {
        1: "AMRAP",
        2: "Time-Based",
        3: "Weight-Based"
    };
    return exerciseTypes[exerciseTypeId] || "Unknown";
}

function submitResults() {
    const formData = new FormData(document.getElementById("recordResultsForm"));
    const data = {
        routineId: formData.get("routine_id"),
        exerciseId: formData.get("exercise_id"),
        setsCompleted: formData.get("sets_completed"),
        repetitionsCompleted: formData.get("repetitions_completed"),
        weightUsed: formData.get("weight_used"),
        timeDuration: formData.get("time_duration") ? new Date("1970-01-01T" + formData.get("time_duration") + "Z").toISOString() : null,
        amrapTime: formData.get("amrap_time") ? new Date("1970-01-01T" + formData.get("amrap_time") + "Z").toISOString() : null,
        resultDate: new Date().toISOString()
    };

    fetch(API_URL_BASE + "/api/Routine/SubmitResults", {
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
