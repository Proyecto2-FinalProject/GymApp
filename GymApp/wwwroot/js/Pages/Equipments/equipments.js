$(document).ready(function () {
    loadEquipments();

    // Handle create equipment form submission
    $("#createEquipmentForm").on("submit", function (event) {
        event.preventDefault();
        let equipment = {
            name: $("#name").val(),
            description: $("#description").val(),
            quantity: $("#quantity").val(),
            status: $("#status").val()
        };
        createEquipment(equipment);
    });

    // Handle edit equipment form submission
    $("#editEquipmentForm").on("submit", function (event) {
        event.preventDefault();
        let equipment = {
            equipmentId: $("#editEquipmentId").val(),
            name: $("#editName").val(),
            description: $("#editDescription").val(),
            quantity: $("#editQuantity").val(),
            status: $("#editStatus").val()
        };
        editEquipment(equipment);
    });

    // Handle delete button click
    $(document).on("click", ".delete-btn", function () {
        let equipmentId = $(this).data("id");
        deleteEquipment(equipmentId);
    });

    // Handle edit button click
    $(document).on("click", ".edit-btn", function () {
        let equipmentId = $(this).data("id");
        loadEquipmentDetails(equipmentId);
    });
});

function loadEquipments() {
    $.ajax({
        url: '/api/Equipments/GetAll',
        method: 'GET',
        success: function (data) {
            renderEquipmentList(data);
        },
        error: function (error) {
            console.log("Error loading equipments: ", error);
        }
    });
}

function createEquipment(equipment) {
    $.ajax({
        url: '/api/Equipments/Create',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(equipment),
        success: function (response) {
            alert("Equipment created successfully!");
            loadEquipments();
        },
        error: function (error) {
            console.log("Error creating equipment: ", error);
        }
    });
}

function editEquipment(equipment) {
    $.ajax({
        url: '/api/Equipments/Edit',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(equipment),
        success: function (response) {
            alert("Equipment updated successfully!");
            loadEquipments();
        },
        error: function (error) {
            console.log("Error updating equipment: ", error);
        }
    });
}

function deleteEquipment(equipmentId) {
    $.ajax({
        url: `/api/Equipments/Delete/${equipmentId}`,
        method: 'DELETE',
        success: function (response) {
            alert("Equipment deleted successfully!");
            loadEquipments();
        },
        error: function (error) {
            console.log("Error deleting equipment: ", error);
        }
    });
}

function loadEquipmentDetails(equipmentId) {
    $.ajax({
        url: `/api/Equipments/GetById/${equipmentId}`,
        method: 'GET',
        success: function (data) {
            // Populate edit form with equipment details
            $("#editEquipmentId").val(data.equipmentId);
            $("#editName").val(data.name);
            $("#editDescription").val(data.description);
            $("#editQuantity").val(data.quantity);
            $("#editStatus").val(data.status);
            // Show the edit modal (you need to implement this part)
        },
        error: function (error) {
            console.log("Error loading equipment details: ", error);
        }
    });
}

function renderEquipmentList(equipments) {
    let tableBody = $("#equipmentTable tbody");
    tableBody.empty();
    equipments.forEach(function (equipment) {
        let row = `<tr>
            <td>${equipment.name}</td>
            <td>${equipment.description}</td>
            <td>${equipment.quantity}</td>
            <td>${equipment.status}</td>
            <td>
                <button class="edit-btn" data-id="${equipment.equipmentId}">Edit</button>
                <button class="delete-btn" data-id="${equipment.equipmentId}">Delete</button>
            </td>
        </tr>`;
        tableBody.append(row);
    });
}
