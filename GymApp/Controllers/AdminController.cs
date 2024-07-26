using Microsoft.AspNetCore.Mvc;

namespace GymApp.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult AdminPage()
        {
            return View();
        }
    }
}