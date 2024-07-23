using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using DTO;
using BL;

namespace API.Controllers.Messages;

[EnableCors("MyCorsPolicy")]
[Route("api/[controller]/[action]")]
[ApiController]
public class EmailController : Controller
{
    private readonly EmailManager _emailService;

    public EmailController(EmailManager emailService)
    {
        _emailService = emailService;
    }

    [HttpPost]
    public async Task<IActionResult> SendResetPasswordEmail([FromBody] string email)
    {
        //Verificamos que si se ingreso un email
        if (string.IsNullOrEmpty(email))
        {
            return BadRequest("Email is required.");
        }

        //Obtenemos el usuario por email y verificamos que existe
        UserManager manager = new UserManager();
        User user = manager.GetUserByEmail(email);
        if (user == null)
        {
            return BadRequest("User not found.");
        }

        // Generamos un token de restablecimiento de contraseña
        var resetToken = Guid.NewGuid().ToString();

        //Enviamos el token en la tabla de usuario y verificamso que se guardo 
        bool tokenSaved = manager.AddResetToken(user.Id, resetToken);

        // Enviamos correo de restablecimiento
        var resetLink = Url.Action("ResetPassword", "Users", new { token = resetToken }, protocol: HttpContext.Request.Scheme);

        // Obtenemos el cuerpo del correo electrónico usando la plantilla HTML
        var emailBody = _emailService.GetResetPasswordEmailBody(resetLink);

        // Enviamos el correo de restablecimiento
        await _emailService.SendEmailAsync(email, "User", "Reset Password", emailBody);

        return Ok(new { Message = "Reset password email sent." });
    }
}