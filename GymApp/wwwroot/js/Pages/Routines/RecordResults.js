document.addEventListener("DOMContentLoaded", function () {
    // Otros manejadores de eventos...

    document.querySelectorAll(".btn-secondary").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const routineId = this.getAttribute("data-routineId");
            window.location.href = `/Routine/RecordResults?routineId=${routineId}`;
        });
    });
});
