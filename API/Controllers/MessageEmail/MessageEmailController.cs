using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using DTO;
using BL;

namespace API.Controllers.MessageEmail;

[EnableCors("MyCorsPolicy")]
[Route("api/[controller]/[action]")]
[ApiController]

public class MessageEmailController : Controller
{
    private readonly EmailService _emailService;

    public MessageEmailController(EmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost]
    public async Task<IActionResult> SendResetPasswordEmail([FromBody] string email)
    {
        // Generamos un token de restablecimiento de contraseña
        var resetToken = Guid.NewGuid().ToString();

        // Enviamos correo de restablecimiento
        var resetLink = Url.Action("ResetPassword", "Users", new { token = resetToken }, protocol: HttpContext.Request.Scheme);

        // Obtenemos el cuerpo del correo electrónico usando la plantilla HTML
        var emailBody = _emailService.GetResetPasswordEmailBody(resetLink);

        // Enviamos el correo de restablecimiento
        await _emailService.SendEmailAsync(email, "User", "Reset Password", emailBody);

        return Ok(new { Message = "Reset password email sent." });
    }


}



