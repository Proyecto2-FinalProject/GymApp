using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using DTO;
using BL;

namespace API.Controllers.Memberships
{
    [EnableCors("MyCorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MembershipsController : Controller
    {
        private readonly MembershipManager _membershipManager;

        // Constructor
        public MembershipsController()
        {
            _membershipManager = new MembershipManager();
        }

        [HttpPost]
        public ActionResult ProcessPayment()
        {
            if (!Request.Form.Files.Any())
            {
                return BadRequest("No file uploaded.");
            }

            var userIdString = Request.Form["userId"];
            var membershipType = Request.Form["membershipType"];
            var paymentMethod = Request.Form["paymentMethod"];
            var amountString = Request.Form["amount"];
            var receiptImageBase64 = Request.Form["receiptImageBase64"];

            if (string.IsNullOrEmpty(userIdString) || string.IsNullOrEmpty(membershipType) ||
                string.IsNullOrEmpty(paymentMethod) || string.IsNullOrEmpty(amountString) ||
                string.IsNullOrEmpty(receiptImageBase64))
            {
                return BadRequest("Missing required fields.");
            }

            if (!int.TryParse(userIdString, out var userId))
            {
                return BadRequest("Invalid user ID.");
            }

            if (!decimal.TryParse(amountString, out var amount))
            {
                return BadRequest("Invalid amount.");
            }

            var payment = new PaymentInfo
            {
                UserId = userId,
                MembershipType = membershipType,
                Amount = amount,
                PaymentMethod = paymentMethod,
                ReceiptImage = receiptImageBase64, // Base64 string for receipt image
            };

            string errorMessage = _membershipManager.ProcessPayment(payment);

            if (!string.IsNullOrEmpty(errorMessage))
            {
                return Ok(new { error = errorMessage });
            }

            return Ok(new { success = true });
        }

    }
}
