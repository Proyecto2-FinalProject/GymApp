using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using DTO;
using BL;

namespace API.Controllers.Users;

[EnableCors("MyCorsPolicy")]
[Route("api/[controller]/[action]")]
[ApiController]

public class UsersController : Controller
{
    [HttpGet]
    public string Prueba()
    {
        return "Hola desde el controlador de Usuarios";
    }

    //Metodo para registrar usuarios: recibismo los datos del UI y los pasamos al User manager
    [HttpPost]
    public ActionResult RegisterUser(User user)
    {
        if (user == null)
        {
            return BadRequest("User data is null.");
        }

        UserManager manager = new UserManager();
        manager.RegisterUser(user);

        return Ok(new { message = "User registered successfully" });
    }

    //Metodo para Iniciar session: recibismo los datos del UI y los pasamos al User manager
    [HttpPost]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        if(request == null)
        {
            return BadRequest("Invalid login request.");
        }

       UserManager manager = new UserManager();
       User user = manager.Login(request.Username, request.Password);

        if (user == null)
        {
            return Unauthorized();
        }          

        return Ok(user);
    }

    [HttpGet]
    public IActionResult ResetPassword(string token)
    {

        return null;
    }

    //Metodo para obtener usuarios por Id: recibismo los datos del UI y los pasamos al User manager
    //No esta implementado 
    [HttpGet]
    public User GetUser(int id)
    {
        UserManager manager = new UserManager();
        User user = manager.GetUserById(id);

        return user;
    }
}



