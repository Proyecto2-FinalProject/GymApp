using Microsoft.AspNetCore.Mvc;
using BL;
using Microsoft.AspNetCore.Cors;
using DTO;

namespace API.Controllers.Routines
{ 
    [EnableCors("ExampleCorsPolicy")]
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
        public ActionResult CreateRoutine(Routine Routine)
        {
            RoutineManager manager = new RoutineManager();
            manager.CreateRoutine(Routine);

            return Ok();
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
