using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace GymApp.Controllers;

public class UserController : Controller
{
   
    public IActionResult Login()
    {
        return View();
    }

    public IActionResult RegisterUser()
    {
        return View();
    }
}

