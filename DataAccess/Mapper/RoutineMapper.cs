using DataAccess.Dao;
using DTO;


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
                exercise_name = result["exercise_name"].ToString(),
                exercise_type = result["exercise_type"].ToString(),
                sets = result.ContainsKey("sets") && !string.IsNullOrEmpty(result["sets"].ToString()) ? int.Parse(result["sets"].ToString()) : 0,
                weight = result.ContainsKey("weight") && !string.IsNullOrEmpty(result["weight"].ToString()) ? decimal.Parse(result["weight"].ToString()) : 0.0m,
                time_duration = result.ContainsKey("time_duration") && TimeSpan.TryParse(result["time_duration"].ToString(), out var timeDuration) ? timeDuration : TimeSpan.Zero,
                machine = result["machine"].ToString()
            };

            return Routine;
        }




        public SqlOperation GetCreateStatement(BaseClass entityDTO)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "dbo.sp_addRoutine";

            Routine Routine = (Routine)entityDTO;

            operation.AddVarcharParam("exercise_name", Routine.exercise_name);
            operation.AddVarcharParam("exercise_type", Routine.exercise_type);
            operation.AddIntegerParam("sets", Routine.sets);
            operation.AddDecimalParam("weight", Routine.weight);
            operation.AddTimeSpanParam("time_duration", Routine.time_duration);
            operation.AddVarcharParam("machine", Routine.machine);

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
