// Función para cargar los instructores en el dropdown
const loadInstructors = () => {
    const apiUrl = `${API_URL_BASE}/api/Instructor/GetAllInstructors`;

    $.ajax({
        url: apiUrl,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
    }).done((result) => {
        const instructorSelect = $("#instructor_id");
        instructorSelect.empty(); // Limpiar opciones anteriores
        instructorSelect.append(new Option("Select an Instructor", "")); // Añadir opción por defecto
        result.forEach(instructor => {
            instructorSelect.append(new Option(instructor.username, instructor.instructorId));
        });
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.error(textStatus, errorThrown);
    });
};

// Función para cargar los miembros en el dropdown
const loadMembers = () => {
    const apiUrl = `${API_URL_BASE}/api/Member/GetAllMembers`;

    $.ajax({
        url: apiUrl,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
    }).done((result) => {
        const memberSelect = $("#member_id");
        memberSelect.empty(); // Limpiar opciones anteriores
        memberSelect.append(new Option("Select a Member", "")); // Añadir opción por defecto
        result.forEach(member => {
            memberSelect.append(new Option(member.username, member.member_id));
        });
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.error(textStatus, errorThrown);
    });
};

// Función para manejar la creación de la rutina
const handleCreateRoutine = (event) => {
    event.preventDefault();

    const routine = {
        memberId: $("#member_id").val(),
        instructorId: $("#instructor_id").val(),
        name: $("#name").val(),
        description: $("#description").val(),
        creationDate: $("#creation_date").val()
    };

    const apiUrl = `${API_URL_BASE}/api/Routine/CreateRoutine`;

    $.ajax({
        url: apiUrl,
        method: "POST",
        hasContent: true,
        data: JSON.stringify(routine),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
    }).done((result) => {
        Swal.fire({
            title: "Routine Creation",
            text: "Routine Created Successfully",
            icon: "success",
        });
    }).fail((jqXHR, textStatus, errorThrown) => {
        Swal.fire({
            title: "Error",
            text: "Failed to create Routine. Please try again.",
            icon: "error",
        });
    });
};

// Inicializar la carga de instructores y miembros al cargar el documento
$(document).ready(() => {
    loadInstructors();
    loadMembers(); // Cargar miembros
    $("#createRoutineForm").on("submit", handleCreateRoutine);
});
