
let table = new DataTable('#sportTable', {
    data: [],
    columns: [
        { data: 'name' },
        { data: 'description' },
        { data: 'country' },
        { data: 'popularity' },
    ]
});

const successAlert = () => {
    Swal.fire({
        title: "Listados",
        text: "Operacion Exitosa",
        icon: "success",
    })
}

const errorAlert = () => {
    Swal.fire({
        title: "Listos",
        text: "Busqueda fallida",
        icon: "error",
    }) 
}

const handleClick = () => {
    const apiUrl = API_BASE_URL + "/Sport/GetAllSports"
    $.ajax({
        url: apiUrl,
      })
        .done( (result) => {
            console.log(result.length);
            table.clear().rows.add(result).draw();
            if (result.length == 0) {
                errorAlert()
            }
            else {
            successAlert()
            }
        }).fail((responseData) => {
            console.error(responseData.statusCode);
            errorAlert()
        });
        
}


$("#searchAllBtn").click(handleClick)

$("#searchSportForm").on("submit", handleSubmit)