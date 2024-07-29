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


//Metodo para el drop down menu que no he logrado solucionar

//$(document).ready(function () {
//    // Load users into the select box
//    $.ajax({
//        url: 'https://localhost:7280/api/AdminApi/GetUsers', // URL ajustada a tu API
//        type: 'GET',
//        success: function (data) {
//            console.log('Users data:', data); // Añadido para depuración
//            var selectUser = $('#selectUser');
//            selectUser.empty();
//            data.forEach(function (user) {
//                console.log('Adding user to select:', user); // Añadido para depuración
//                selectUser.append(new Option(user.username, user.id));
//            });
//            console.log('User select after appending:', selectUser.html()); // Añadido para depuración
//        },
//        error: function (error) {
//            console.error('Error fetching users:', error);
//        }
//    });

//    // Load roles into the select box
//    $.ajax({
//        url: 'https://localhost:7280/api/AdminApi/GetRoles', // URL ajustada a tu API
//        type: 'GET',
//        success: function (data) {
//            console.log('Roles data:', data); // Añadido para depuración
//            var selectRole = $('#selectRole');
//            selectRole.empty();
//            data.forEach(function (role) {
//                console.log('Adding role to select:', role); // Añadido para depuración
//                selectRole.append(new Option(role.name, role.id));
//            });
//            console.log('Role select after appending:', selectRole.html()); // Añadido para depuración
//        },
//        error: function (error) {
//            console.error('Error fetching roles:', error);
//        }
//    });

//    // Handle form submission
//    $('#assignRoleForm').submit(function (event) {
//        event.preventDefault();

//        var userId = $('#selectUser').val();
//        var roleId = $('#selectRole').val();

//        console.log('Assigning role:', { UserId: userId, RoleId: roleId }); // Añadido para depuración

//        $.ajax({
//            url: 'https://localhost:7280/api/AdminApi/AssignRole', // URL ajustada a tu API
//            type: 'POST',
//            contentType: 'application/json',
//            data: JSON.stringify({ UserId: userId, RoleId: roleId }),
//            success: function (response) {
//                alert('Role assigned successfully!');
//            },
//            error: function (error) {
//                console.error('Error assigning role:', error);
//                alert('Failed to assign role.');
//            }
//        });
//    });
//});