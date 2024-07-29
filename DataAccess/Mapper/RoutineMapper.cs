using DataAccess.Dao;
using DTO;
using System.Diagnostics.Metrics;


namespace DataAccess.Mapper
{
    public class RoutineMapper : ICrudStatements, IObjectMapper

    {

        public List<BaseClass> BuildObjects(List<Dictionary<string, object>> objectRows)
        {
            var list = new List<BaseClass>();
            
            foreach( var row in objectRows)
            {
                var routine = BuildObject(row);
                list.Add(routine);
            }

            return list;
        }

        public BaseClass BuildObject(Dictionary<string, object> result)
        {
            var routine = new Routine()
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
            return routine;
        }




        public SqlOperation GetCreateStatement(BaseClass entityDTO)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "dbo.sp_addRoutine";

            Routine Routine = (Routine)entityDTO;

            operation.AddIntegerParam("member_id", Routine.memberId);
            operation.AddIntegerParam("instructor_id", Routine.instructorId);
            operation.AddIntegerParam("measurement_appointment_id", Routine.measurementAppointmentId);
            operation.AddVarcharParam("name", Routine.name);
            operation.AddVarcharParam("description", Routine.description);
            operation.AddDateTimeParam("creation_date", Routine.creationDate);

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
    }
}
