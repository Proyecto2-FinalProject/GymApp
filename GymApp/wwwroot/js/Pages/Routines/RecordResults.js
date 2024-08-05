document.addEventListener("DOMContentLoaded", function () {
    // Obtén el ID de la rutina desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const routineId = urlParams.get('routineId');

    if (!routineId) {
        console.error("Routine ID not provided.");
        return;
    }

    // Cargar ejercicios para la rutina seleccionada
    fetchExercisesForRoutine(routineId);

    // Manejar el envío del formulario
    const form = document.getElementById("recordResultsForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        submitResults(routineId);
    });
});

function fetchExercisesForRoutine(routineId) {
    const apiUrl = `/api/Routine/GetExercisesForRoutine?routineId=${routineId}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(exercises => {
            if (exercises && exercises.length > 0) {
                populateExerciseDropdown(exercises);
            } else {
                console.error("No exercises found for the given routine.");
            }
        })
        .catch(error => console.error("Error fetching exercises:", error));
}

function populateExerciseDropdown(exercises) {
    const exerciseSelect = document.getElementById("exercise_id");
    exerciseSelect.innerHTML = ""; // Limpiar opciones anteriores

    exercises.forEach(exercise => {
        const option = document.createElement("option");
        option.value = exercise.exerciseId;
        option.textContent = exercise.name;
        exerciseSelect.appendChild(option);
    });
}

function submitResults(routineId) {
    // Obtener datos del formulario
    const exerciseId = document.getElementById("exercise_id").value;
    const setsCompleted = document.getElementById("sets_completed").value;
    const repetitionsCompleted = document.getElementById("repetitions_completed").value;
    const weightUsed = document.getElementById("weight_used").value;
    const timeDuration = document.getElementById("time_duration").value;
    const amrapTime = document.getElementById("amrap_time").value;

    // Crear objeto con los datos
    const resultsData = {
        routineId: parseInt(routineId),
        exerciseId: parseInt(exerciseId),
        setsCompleted: parseInt(setsCompleted),
        repetitionsCompleted: parseInt(repetitionsCompleted),
        weightUsed: parseFloat(weightUsed),
        timeDuration: timeDuration || null,
        amrapTime: amrapTime || null
    };

    // Enviar datos al servidor
    fetch("/api/Routine/RecordResults", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resultsData)
    })
        .then(response => {
            if (response.ok) {
                alert("Results recorded successfully.");
                form.reset(); // Limpiar formulario
            } else {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error recording results.");
                });
            }
        })
        .catch(error => console.error("Error recording results:", error));
}
