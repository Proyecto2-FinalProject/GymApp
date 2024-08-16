$(document).ready(function () {
    // Load users into the select box
    $.ajax({
        url: 'https://localhost:7280/api/AdminApi/GetUsers', // Ajusta la URL según tu configuración
        type: 'GET',
        success: function (data) {
            var selectUser = $('#selectUser');
            selectUser.empty();
            selectUser.append('<option value="" disabled selected>Choose a user</option>');
            data.forEach(function (user) {
                selectUser.append(new Option(user.username, user.id));
            });
        },
        error: function (error) {
            console.error('Error fetching users:', error);
        }
    });

    // Load roles into the select box
    $.ajax({
        url: 'https://localhost:7280/api/AdminApi/GetRoles', // Ajusta la URL según tu configuración
        type: 'GET',
        success: function (data) {
            var selectRole = $('#selectRole');
            selectRole.empty();
            selectRole.append('<option value="" disabled selected>Choose a role</option>');
            data.forEach(function (role) {
                selectRole.append(new Option(role.name, role.id));
            });
        },
        error: function (error) {
            console.error('Error fetching roles:', error);
        }
    });

    // Handle form submission
    $('#assignRoleForm').submit(function (event) {
        event.preventDefault();

        var userId = $('#selectUser').val();
        var roleId = $('#selectRole').val();

        $.ajax({
            url: 'https://localhost:7280/api/AdminApi/AssignRole', // Ajusta la URL según tu configuración
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ UserId: userId, RoleId: roleId }),
            success: function (response) {
                alert('Role assigned successfully!');
            },
            error: function (error) {
                console.error('Error assigning role:', error);
                alert('Failed to assign role.');
            }
        });
    });
});


