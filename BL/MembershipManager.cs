using DTO;
using DataAccess.CRUD;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace BL
{
    public class MembershipManager
    {
        public string ProcessPayment(PaymentInfo payment)
        {
            MembershipCrudFactory me_crud = new MembershipCrudFactory();

            return me_crud.RegisterMembership(payment);
        }

       
    }
}