document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const routineId = urlParams.get('routineId');

    if (!routineId) {
        console.error("Routine ID not provided.");
        return;
    }

    fetchRecordedResults(routineId);
});

function fetchRecordedResults(routineId) {
    const apiUrl = `/api/Routine/GetRecordedResults?routineId=${routineId}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(results => {
            if (results && results.length > 0) {
                populateResultsTable(results);
            } else {
                console.error("No results found for the given routine.");
            }
        })
        .catch(error => console.error("Error fetching recorded results:", error));
}

function populateResultsTable(results) {
    const resultsTableBody = document.getElementById("resultsTable").querySelector("tbody");
    resultsTableBody.innerHTML = ""; // Limpiar filas anteriores

    results.forEach(result => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${result.exerciseName || 'N/A'}</td>
            <td>${result.setsCompleted || 'N/A'}</td>
            <td>${result.repetitionsCompleted || 'N/A'}</td>
            <td>${result.weightUsed || 'N/A'}</td>
            <td>${result.timeDuration || 'N/A'}</td>
            <td>${result.amrapTime || 'N/A'}</td>
        `;
        resultsTableBody.appendChild(row);
    });
}
