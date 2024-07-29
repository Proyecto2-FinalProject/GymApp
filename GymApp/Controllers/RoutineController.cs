using Microsoft.AspNetCore.Mvc;

namespace GymApp.Controllers
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
