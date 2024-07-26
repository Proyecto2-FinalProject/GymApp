document.addEventListener('DOMContentLoaded', function () {
    

    // Obtener todos los ejercicios
    fetch(API_URL_BASE + "/api/Exercise/GetAllExercises")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const exerciseSelect = document.getElementById('exercise_id');
            data.forEach(exercise => {
                const option = document.createElement('option');
                option.value = exercise.exerciseId; // Asegúrate de que este campo corresponda a la propiedad id de tu modelo
                option.textContent = exercise.name; // Asegúrate de que este campo corresponda a la propiedad name de tu modelo
                exerciseSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching exercises:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to fetch exercises. Please try again.',
                icon: 'error'
            });
        });

    const form = document.getElementById('selectExercisesForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const exercise = {
            routine_id: document.getElementById('routine_id').value, // Asegúrate de que este campo esté en el formulario y tenga el ID correcto
            exercise_id: document.getElementById('exercise_id').value,
            exercise_type: document.getElementById('exercise_type').value,
            sets: document.getElementById('sets').value,
            repetitions: document.getElementById('repetitions').value,
            weight: document.getElementById('weight').value,
            time_duration: document.getElementById('time_duration').value,
            amrap_time: document.getElementById('amrap_time').value,
        };

        fetch(API_URL_BASE + '/api/Routine/AddExerciseToRoutine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exercise)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Exercise added to routine successfully!',
                        icon: 'success'
                    });
                    // Opcional: Redirigir o limpiar el formulario
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error: ' + data.message,
                        icon: 'error'
                    });
                }
            })
            .catch(error => {
                console.error('Error adding exercise:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to add exercise. Please try again.',
                    icon: 'error'
                });
            });
    });
});
