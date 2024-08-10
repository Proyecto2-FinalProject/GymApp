using DataAccess.Dao;
using DTO;
using System.Data.SqlClient;
using System.Diagnostics.Metrics;


namespace DataAccess.Mapper
{
    public class MembershipMapper : ICrudStatements, IObjectMapper

    {

        public List<BaseClass> BuildObjects(List<Dictionary<string, object>> objectRows)
        {
            var list = new List<BaseClass>();
            
            foreach( var row in objectRows)
            {
                var membership = BuildObject(row);
                list.Add(membership);
            }

            return list;
        }

        public BaseClass BuildObject(Dictionary<string, object> result)
        {
            var membership = new Routine()
            {
                Id = int.Parse(result["Id"].ToString()),
                memberId = int.Parse(result["member_id"].ToString()),
                instructorId = int.Parse(result["instructor_id"].ToString()),
                measurementAppointmentId = int.Parse(result["measurement_appointment_id"].ToString()),
                name = result["name"].ToString(),
                description = result["description"].ToString(),
                // Asegúrate de que la fecha sea correctamente convertida
                creationDate = DateTime.Parse(result["creation_date"].ToString(), null, System.Globalization.DateTimeStyles.RoundtripKind)
            };
            return membership;
        }

        public SqlOperation GetCreateStatement(BaseClass entityDTO, SqlParameter errorMessage)
        {
            SqlOperation operation = new SqlOperation
            {
                ProcedureName = "dbo.sp_ProcessMembershipPayment"
            };

            PaymentInfo payment = (PaymentInfo)entityDTO;

            operation.AddIntegerParam("user_id ", payment.UserId);
            operation.AddVarcharParam("membership_type", payment.MembershipType);
            operation.AddDecimalParam("amount", payment.Amount);
            operation.AddVarcharParam("payment_method", payment.PaymentMethod);
            operation.AddVarcharParam("receipt_image", payment.ReceiptImage);

            operation.parameters.Add(errorMessage);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseClass entityDTO)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "dbo.sp_getAllRoutines";

            return operation;
        }

        public SqlOperation GetRetrieveByIdStatement(int Id)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "dbo.sp_getRoutine";

            operation.AddIntegerParam("Id", Id);

            return operation;
        }
        public SqlOperation GetUpdateStatement(BaseClass entityDTO)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetCreateStatement(BaseClass entityDTO)
        {
            throw new NotImplementedException();
        }
    }
}
