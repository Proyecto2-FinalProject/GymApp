using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace GymApp.Controllers;

public class RoutineController : Controller
{
   
    public IActionResult CreateRoutine()
    {
        return View();
    }

    public async Task<IActionResult> Create()
    {
        return View();
    }

}
