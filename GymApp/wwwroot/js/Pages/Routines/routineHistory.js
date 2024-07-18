document.addEventListener("DOMContentLoaded", function () {
    // URL de tu API o endpoint donde se obtienen las rutinas
    const apiUrl = '/api/Routine/GetAllRoutines';

    // Función para obtener los datos de las rutinas desde el servidor
    function fetchRoutines() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                populateTable(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Función para llenar la tabla con los datos obtenidos
    function populateTable(data) {
        const tableBody = document.querySelector("#exerciseTable tbody");
        tableBody.innerHTML = ''; // Limpiar el contenido existente

        data.forEach(item => {
            const row = document.createElement("tr");

            Object.values(item).forEach(text => {
                const cell = document.createElement("td");
                cell.textContent = text;
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });
    }

    // Llamar a la función para obtener y llenar los datos al cargar la página
    fetchRoutines();

    // Añadir evento al botón "List All" para recargar los datos
    document.querySelector(".btn-list-all").addEventListener("click", fetchRoutines);
});
