using Microsoft.AspNetCore.Mvc;

namespace EjemploMVC_SCV0.Controllers
{
    public class RoutineController : Controller
    {

        public async Task<IActionResult> Create()
        {
            return View();
        }
        public async Task<IActionResult> routinesList()
        {
            return View();
        }
    }


}
