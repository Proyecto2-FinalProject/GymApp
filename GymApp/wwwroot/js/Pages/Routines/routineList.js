document.addEventListener("DOMContentLoaded", function () {
    fetchRoutines();
});

function fetchRoutines() {
    const apiUrl = API_URL_BASE + "/api/Routine/GetAllRoutines";
    fetch(apiUrl)
        .then(response => response.json())
        .then(routines => {
            if (routines && routines.length) {
                routines.forEach(routine => {
                    fetchRoutineExercises(routine);
                });
            } else {
                console.error("No routines found.");
            }
        })
        .catch(error => console.error("Error fetching routines:", error));
}

function fetchRoutineExercises(routine) {
    const apiUrl = API_URL_BASE + "/api/Routine/GetExercisesForRoutine?routineId=" + routine.routineId;
    fetch(apiUrl)
        .then(response => response.json())
        .then(exercises => {
            populateRoutineTable(routine, exercises);
        })
        .catch(error => console.error("Error fetching exercises:", error));
}

function populateRoutineTable(routine, exercises) {
    const routineList = document.getElementById("routine-list");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${routine.routineId}</td>
        <td>${routine.memberId}</td>
        <td>${routine.instructorId}</td>
        <td>${routine.name}</td>
        <td>${routine.description}</td>
        <td>${routine.creationDate}</td>
        <td>
            <a href="/Routine/Results?routineId=${routine.routineId}" class="btn btn-primary">Results</a>
            <a href="/Routine/RecordResults?routineId=${routine.routineId}" class="btn btn-secondary">Record Results</a>
            <button class="btn btn-danger" onclick="deleteRoutine(${routine.routineId})">Delete</button>
        </td>
    `;

    routineList.appendChild(row);

    if (exercises && exercises.length) {
        exercises.forEach(exercise => {
            const exerciseRow = document.createElement("tr");
            exerciseRow.innerHTML = `
                <td colspan="7" style="padding-left: 20px;">
                    <strong>Exercise:</strong> ${exercise.name}, 
                    <strong>Type:</strong> ${exercise.typeName}, 
                    <strong>Sets:</strong> ${exercise.sets}, 
                    <strong>Reps:</strong> ${exercise.repetitions}, 
                    <strong>Weight:</strong> ${exercise.weight}, 
                    <strong>Duration:</strong> ${exercise.timeDuration}, 
                    <strong>AMRAP Time:</strong> ${exercise.amrapTime}
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
