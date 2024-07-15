using DataAccess.Dao;
using DTO;
using System.Reflection.PortableExecutable;


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
            var Routine = new Routine()
            {
                Id = int.Parse(result["Id"].ToString()),
                ExerciseName = result["Nombre"].ToString(),
                ExerciseType = result["Descripcion"].ToString(),
                Sets = int.Parse(result["Id"].ToString()),
                Weight = decimal.Parse(result["Id"].ToString()),
                TimeDuration = TimeSpan.Parse(result["Id"].ToString()),
                Machine = result["exercise_name"].ToString(),
            };

            return Routine;
        }




        public SqlOperation GetCreateStatement(BaseClass entityDTO)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "dbo.sp_addRoutine";

            Routine Routine = (Routine)entityDTO;

            operation.AddVarcharParam("exercise_name", Routine.ExerciseName);
            operation.AddVarcharParam("exercise_type", Routine.ExerciseType);
            operation.AddIntegerParam("sets", Routine.Sets);
            operation.AddDecimalParam("weight", Routine.Weight);
            operation.AddTimeSpanParam("time_duration", Routine.TimeDuration);
            operation.AddVarcharParam("machine", Routine.Machine);

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
