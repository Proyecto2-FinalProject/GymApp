
let table = new DataTable('#routineTable', {
    data: [],
    columns: [
        { data: 'instructorName' },
        { data: 'exerciseName' },
        { data: 'exerciseType' },
        { data: 'sets' },
        { data: 'weight' },
        { data: 'timeDuration' },
        { data: 'machine' },
    ]
});

const successAlert = () => {
    Swal.fire({
        title: "Routine Listings",
        text: "Success",
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
    const apiUrl = API_URL_BASE + "/api/Routine/GetAllRoutines"
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

$("#searchRoutineForm").on("submit", handleSubmit)