document.addEventListener("DOMContentLoaded", function () {
    // Obtén el routineId de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const routineId = urlParams.get('routineId');

    // Verifica si routineId es válido antes de proceder
    if (routineId) {
        fetch(`https://localhost:7280/api/Routine/GetRecordedResults?routineId=${routineId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const results = data.data;
                    const tbody = document.querySelector("#resultsTable tbody");
                    tbody.innerHTML = ''; // Limpia el contenido actual

                    results.forEach(result => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${result.exerciseId || 'N/A'}</td>
                            <td>${result.setsCompleted !== null && result.setsCompleted !== undefined ? result.setsCompleted : 'N/A'}</td>
                            <td>${result.repetitionsCompleted !== null && result.repetitionsCompleted !== undefined ? result.repetitionsCompleted : 'N/A'}</td>
                            <td>${result.weightUsed !== null && result.weightUsed !== undefined ? result.weightUsed : 'N/A'}</td>
                            <td>${result.timeDuration || 'N/A'}</td>
                            <td>${result.amrapTime || 'N/A'}</td>
                        `;
                        tbody.appendChild(row);
                    });
                } else {
                    console.error(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        console.error('routineId is not defined');
    }
});
