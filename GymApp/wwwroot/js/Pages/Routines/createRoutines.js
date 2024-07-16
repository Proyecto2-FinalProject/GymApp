const handleCreateRoutine = (event) => {
    event.preventDefault()
    //Recopilar la informacion y mandarla al API

    const routine = {}
    routine.instructorname = $("#instructor_name").val()
    routine.exercisename = $("#exercise_name").val()
    routine.exercisetype = $("#exercise_type").val()
    routine.sets = $("#sets").val()
    routine.weight = $("#weight").val() 
    routine.timeduration = $("#time_duration").val()
    routine.machine = $("#machine").val()

    const apiUrl = API_URL_BASE + "/api/Routine/CreateRoutine";
    $.ajax({
        url: apiUrl,
        method: "POST",
        hasContent: true,
        data: JSON.stringify(routine),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
      }).done( (result) => {
            console.log(result);
             Swal.fire({
               title: "Mensaje",
               text: "Routine created successfully",
               icon: "success",
           })
        }).fail((responseData) => {
            if (responseData.responseCode) {
                console.error(responseData.responseCode);
            }
        });
        
}

$("#createRoutineForm").on("submit", handleCreateRoutine)