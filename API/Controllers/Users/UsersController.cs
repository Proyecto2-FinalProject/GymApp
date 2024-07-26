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

    //Metodo para registrar usuarios: recibismo los datos del UI y los pasamos al User manager
    [HttpPost]
    public ActionResult RegisterUser(User user)
    {
        UserManager manager = new UserManager();
        manager.RegisterUser(user);

        if (user == null)
        {
            return BadRequest("User data is null.");
        }

        return Ok(new { message = "User registered successfully" });
    }

    //Metodo para Iniciar session: recibismo los datos del UI y los pasamos al User manager
    [HttpPost]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        UserManager manager = new UserManager();
        User user = manager.Login(request.Username, request.Password);

        if (request == null)
        {
            return BadRequest("Invalid login request.");
        }
    
        if (user == null)
        {
            return Unauthorized();
        }          

        return Ok(user);
    }

    [HttpPost]
    public IActionResult ResetPassword([FromBody] ResetPassword request)
    {
        //Validamos que el request no sea null y que tenga un token y un new password 
        if (request == null || string.IsNullOrEmpty(request.Token) || string.IsNullOrEmpty(request.NewPassword))
        {
            return BadRequest("Invalid password reset request.");
        }

        UserManager manager = new UserManager();
        bool result = manager.UpdatePassword(request.Token, request.NewPassword);
        if (!result)
        {
            return BadRequest("Invalid token or unable to reset password.");
        }

        return Ok(new { message = "Password reset successfully." });
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



