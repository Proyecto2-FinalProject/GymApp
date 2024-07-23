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
        [HttpGet]
        public string Prueba()
        {
            return "Hola desde el controlador de Rutinas";
        }

        [HttpPost]
        public IActionResult CreateRoutine([FromBody] Routine routine)
        {
            try
            {
                RoutineManager manager = new RoutineManager();
                manager.CreateRoutine(routine);

                // Devolver una respuesta JSON con un mensaje de éxito
                return Json(new { success = true, message = "Routine created successfully" });
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
        

    }
}
