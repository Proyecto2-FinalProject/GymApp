using Microsoft.AspNetCore.Mvc;

namespace GymApp.Controllers
{
    public class ExercisesController : Controller
    {

        public async Task<IActionResult> Create()
        {
            return View();
        }
        

    }
}
