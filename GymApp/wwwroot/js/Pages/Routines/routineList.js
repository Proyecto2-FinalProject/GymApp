document.addEventListener("DOMContentLoaded", function () {
    fetchRoutines();
}); // Carga del DOM y Fetch de Rutinas

function fetchRoutines() {
    const apiUrl = API_URL_BASE + "/api/Routine/GetAllRoutines"; // Define la URL de la API para obtener todas las rutinas
    fetch(apiUrl) // Realiza una solicitud HTTP a la URL de la API definida.
        .then(response => response.json()) // Convierte la respuesta en formato JSON.
        .then(routines => {
            if (routines && routines.length) {
                routines.forEach(routine => {
                    fetchRoutineExercises(routine);
                });
            } else {
                console.error("No routines found.");
            }
        })
        .catch(error => console.error("Error fetching routines:", error)); // Maneja los datos obtenidos de la API, Si hay rutinas disponibles, se llama a fetchRoutineExercises para cada rutina
        // Si no hay rutinas, se muestra un error en la consola.
}

function fetchRoutineExercises(routine) {
    const apiUrl = API_URL_BASE + "/api/Routine/GetExercisesForRoutine?routineId=" + routine.routineId;
    fetch(apiUrl)
        .then(response => response.json())
        .then(exercises => { // Pasa los ejercicios obtenidos y la rutina actual a la funci�n populateRoutineTable.
            populateRoutineTable(routine, exercises);
        })
        .catch(error => console.error("Error fetching exercises:", error));
}

function populateRoutineTable(routine, exercises) {
    const routineList = document.getElementById("routine-list");

    // Crear la fila para la rutina
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${routine.username || 'N/A'}</td> <!-- Mostrar el username en lugar de memberId -->
        <td>${routine.instructorId}</td>
        <td>${routine.name}</td>
        <td>${routine.description}</td>
        <td>${routine.creationDate}</td>
        <td>
            <a href="/Routine/Results?routineId=${routine.routineId}" class="btn btn-primary">Results</a>
            <a href="/Routine/RecordResults?routineId=${routine.routineId}" class="btn btn-secondary">Record Results</a>
        </td>
    `;
    routineList.appendChild(row);

    if (exercises && exercises.length) {
        exercises.forEach(exercise => {
            let exerciseContent = `<strong>Exercise:</strong> ${exercise.name || 'N/A'}`;

            if (exercise.TypeName !== null) {
                exerciseContent += `, <strong>Type:</strong> ${exercise.TypeName || 'N/A'}`;
            }
            if (exercise.sets !== null) {
                exerciseContent += `, <strong>Sets:</strong> ${exercise.sets}`;
            }
            if (exercise.repetitions !== null) {
                exerciseContent += `, <strong>Reps:</strong> ${exercise.repetitions}`;
            }
            if (exercise.weight !== null) {
                exerciseContent += `, <strong>Weight:</strong> ${exercise.weight}`;
            }
            if (exercise.timeDuration !== null) {
                exerciseContent += `, <strong>Duration:</strong> ${exercise.timeDuration}`;
            }
            if (exercise.amrapTime !== null) {
                exerciseContent += `, <strong>AMRAP Time:</strong> ${exercise.amrapTime}`;
            }

            const exerciseRow = document.createElement("tr");
            exerciseRow.innerHTML = `
                <td colspan="7" style="padding-left: 20px;">
                    ${exerciseContent}
                </td>
            `;
            routineList.appendChild(exerciseRow);
        });
    } else {
        const noExerciseRow = document.createElement("tr");
        noExerciseRow.innerHTML = `<td colspan="7" style="padding-left: 20px;">No exercises found for this routine.</td>`;
        routineList.appendChild(noExerciseRow);
    }
}
