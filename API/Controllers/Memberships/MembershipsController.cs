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
            var payment = new PaymentInfo
            {
                UserId = int.Parse(Request.Form["userId"]),
                MembershipType = Request.Form["membershipType"],
                Amount = decimal.Parse(Request.Form["amount"]),
                PaymentMethod = Request.Form["paymentMethod"],
                ReceiptImage = Request.Form["receiptImage"],
            };
 
            if (payment.UserId == null || payment.ReceiptImage == null)
            {
                return BadRequest("Missing required fields.");
            }

            string errorMessage = _membershipManager.ProcessPayment(payment);

            return Ok(new { error = errorMessage });
        }

       
    }
}
