using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using DTO;
using BL;

namespace API.Controllers.Users
{
    [EnableCors("MyCorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : Controller
    {
        [HttpPost]
        public ActionResult RegisterUser(User user)
        {
            UserManager manager = new UserManager();
            string error = manager.RegisterUser(user);

            if (user == null)
            {
                return BadRequest("User data is null.");
            }

            return Ok(new { errorMessage = error });
        }

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
                return BadRequest("Username or password are incorrect.");
            }
            var RoleName = manager.GetUserRoleName(user.Id);
            return Ok(new { username = user.Username, role = RoleName});
        }

        [HttpPost]
        public IActionResult ResetPassword([FromBody] ResetPassword request)
        {
            UserManager manager = new UserManager();
            string error = manager.UpdatePassword(request);

            if (request == null || string.IsNullOrEmpty(request.Token) || string.IsNullOrEmpty(request.NewPassword))
            {
                return BadRequest("Invalid request to reset password.");
            }

            return Ok(new { errorMessage = error });
        }

        [HttpGet]
        public IActionResult VerifyAccount([FromQuery] string otp)
        {
            UserManager manager = new UserManager();
            string error = manager.VerifyAccount(otp);

            if (string.IsNullOrEmpty(otp) )
            {
                return BadRequest("Invalid request to verify account.");
            }

            return Ok(new { errorMessage = error });
        }

        [HttpGet]
        public User GetUser(int id)
        {
            UserManager manager = new UserManager();
            User user = manager.GetUserById(id);

            return user;
        }
    }
}