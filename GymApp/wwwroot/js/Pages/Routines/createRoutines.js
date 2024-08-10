// Funci�n para cargar los instructores en el dropdown
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
        instructorSelect.append(new Option("Select an Instructor", "")); // A�adir opci�n por defecto
        result.forEach(instructor => {
            instructorSelect.append(new Option(instructor.username, instructor.instructorId));
        });
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.error(textStatus, errorThrown);
    });
};

// Funci�n para cargar los miembros en el dropdown
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
        memberSelect.append(new Option("Select a Member", "")); // A�adir opci�n por defecto
        result.forEach(member => {
            memberSelect.append(new Option(member.username, member.member_id)); // Aseg�rate de que el valor es el ID
        });
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.error(textStatus, errorThrown);
    });
};

// Funci�n para manejar la creaci�n de la rutina
const handleCreateRoutine = (event) => {
    event.preventDefault();

    const routine = {
        memberId: $("#member_id").val(), // Esto deber�a ser el ID del miembro seleccionado
        instructorId: $("#instructor_id").val(),
        name: $("#name").val(),
        description: $("#description").val()
        // No incluir creationDate aqu�
    };

    const apiUrl = `${API_URL_BASE}/api/Routine/CreateRoutine`;

    $.ajax({
        url: apiUrl,
        method: "POST",
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
