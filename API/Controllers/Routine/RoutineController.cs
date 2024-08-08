
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
                // Asignar la fecha y hora actual automáticamente
                routine.creationDate = DateTime.Now;

                // Imprimir el valor recibido
                Console.WriteLine($"Assigned creationDate: {routine.creationDate}");

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
                if (routineExercise == null)
                {
                    return BadRequest(new { success = false, message = "The request body is null" });
                }

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

        [HttpGet]
        public IActionResult GetRecordedResults(int routineId)
        {
            try
            {
                RoutineResultManager manager = new RoutineResultManager();
                var results = manager.GetResultsByRoutineId(routineId);

                return Json(new { success = true, data = results });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public IActionResult AddRoutineResults([FromBody] RoutineResult routineResult)
        {
            try
            {
                if (routineResult == null)
                {
                    return BadRequest(new { success = false, message = "The request body is null" });
                }

                RoutineResultManager manager = new RoutineResultManager();
                manager.AddRoutineResults(routineResult);

                return Json(new { success = true, message = "Results recorded successfully" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }




    }
}
