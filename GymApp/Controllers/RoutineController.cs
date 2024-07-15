using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace GymApp.Controllers;

public class RoutineController : Controller
{
   
    public async Task<IActionResult> Create()
    {
        return View();
    }

}
