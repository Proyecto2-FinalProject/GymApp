using Microsoft.AspNetCore.Mvc;
using BL;
using Microsoft.AspNetCore.Cors;
using DTO;

namespace API.Controllers.Routines
{
    [EnableCors("MyCorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RoutineController : Controller
    {
        [HttpPost]
        public IActionResult CreateRoutine([FromBody] Routine routine)
        {
            try
            {
                // Imprimir el valor recibido
                Console.WriteLine($"Received creationDate: {routine.creationDate}");

                // Validar que creationDate esté dentro del rango permitido
                if (routine.creationDate < new DateTime(1753, 1, 1) || routine.creationDate > new DateTime(9999, 12, 31))
                {
                    return Json(new { success = false, message = "The date must be between 1/1/1753 and 12/31/9999." });
                }

                RoutineManager manager = new RoutineManager();
                manager.CreateRoutine(routine);

                // Devolver una respuesta JSON con el ID de la rutina creada
                return Json(new { success = true, routineId = routine.routineId, message = "Routine created successfully" });
            }
            catch (Exception ex)
            {
                // Manejar el error y devolver una respuesta JSON con un mensaje de error
                return Json(new { success = false, message = ex.Message });
            }
        }
        RoutineManager manager = new RoutineManager();


        [HttpGet]
        public Routine GetRoutine(int id)
        {
            RoutineManager manager = new RoutineManager();
            Routine routine = manager.GetRoutineById(id);

            return routine;
        }
        [HttpGet]
        public List<Routine> GetAllRoutines()
        {
            RoutineManager manager = new RoutineManager();
            List<Routine> routineList = manager.GetAllRoutines();

            return routineList;
        }

       [HttpPost]
        public IActionResult AddExerciseToRoutine([FromBody] RoutineExercise routineExercise)
        {
            try
            {
                RoutineExerciseManager manager = new RoutineExerciseManager();
                manager.AddExerciseToRoutine(routineExercise);

                return Json(new { success = true, message = "Exercise added to routine successfully" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetExercisesForRoutine(int routineId)
        {
            try
            {
                RoutineExerciseManager manager = new RoutineExerciseManager();
                List<RoutineExercise> exercises = manager.GetExercisesForRoutine(routineId);

                return Ok(exercises);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }




    }
}
