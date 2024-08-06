document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recordResultsForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        // Obtén los valores del formulario
        const exerciseId = document.getElementById('exercise_id').value;
        const setsCompleted = parseInt(document.getElementById('sets_completed').value) || null;
        const repetitionsCompleted = parseInt(document.getElementById('repetitions_completed').value) || null;
        const weightUsed = parseFloat(document.getElementById('weight_used').value) || null;
        const timeDuration = document.getElementById('time_duration').value;
        const amrapTime = document.getElementById('amrap_time').value;

        // Convierte el tiempo en formato ISO 8601
        const formatTime = (time) => {
            if (!time) return null;
            const [hours, minutes] = time.split(':').map(num => parseInt(num));
            return new Date(0, 0, 0, hours, minutes).toISOString().substr(11, 8);
        };

        // Construye el objeto que se enviará al backend
        const routineResult = {
            routineId: 12, // Suponiendo que este valor se obtiene dinámicamente
            exerciseId: parseInt(exerciseId),
            setsCompleted: setsCompleted,
            repetitionsCompleted: repetitionsCompleted,
            weightUsed: weightUsed,
            timeDuration: formatTime(timeDuration),
            amrapTime: formatTime(amrapTime),
            resultDate: new Date().toISOString() // Fecha y hora actuales
        };

        try {
            const response = await fetch('https://localhost:7280/api/Routine/AddRoutineResults', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(routineResult)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Results recorded successfully');
                form.reset(); // Opcional: reinicia el formulario
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert('An unexpected error occurred.');
            console.error('Error:', error);
        }
    });
});
