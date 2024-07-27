using DataAccess.Dao;
using DTO;
using System.Collections.Generic;

namespace DataAccess.Mapper
{
    public class RoutineExerciseMapper : ICrudStatements, IObjectMapper
    {
        public List<BaseClass> BuildObjects(List<Dictionary<string, object>> objectRows)
        {
            var list = new List<BaseClass>();

            foreach (var row in objectRows)
            {
                var routineExercise = BuildObject(row);
                list.Add(routineExercise);
            }

            return list;
        }

        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            var routineExercise = new RoutineExercise
            {
                routineExerciseId = Convert.ToInt32(row["routine_exercise_id"]),
                routineId = Convert.ToInt32(row["routine_id"]),
                exerciseId = Convert.ToInt32(row["exercise_id"]),
                exerciseType = row["exercise_type"].ToString(),
                sets = Convert.ToInt32(row["sets"]),
                repetitions = Convert.ToInt32(row["repetitions"]),
                weight = Convert.ToDecimal(row["weight"]),
                timeDuration = TimeSpan.Parse(row["time_duration"].ToString()),
                amrapTime = TimeSpan.Parse(row["amrap_time"].ToString())
            };
       

            return routineExercise;
        }

        public SqlOperation GetCreateStatement(BaseClass entityDTO)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "dbo.sp_addExerciseToRoutine";

            RoutineExercise routineExercise = (RoutineExercise)entityDTO;

            operation.AddIntegerParam("routine_id", routineExercise.routineId);
            operation.AddIntegerParam("exercise_id", routineExercise.exerciseId);
            operation.AddVarcharParam("exercise_type", routineExercise.exerciseType);
            operation.AddIntegerParam("sets", routineExercise.sets);
            operation.AddIntegerParam("repetitions", routineExercise.repetitions);
            operation.AddDecimalParam("weight", routineExercise.weight);
            operation.AddTimeSpanParam("time_duration", routineExercise.timeDuration);
            operation.AddTimeSpanParam("amrap_time", routineExercise.amrapTime);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseClass entityDTO)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "dbo.sp_getAllRoutineExercises";

            return operation;
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "dbo.sp_getRoutineExerciseById";

            operation.AddIntegerParam("id", id);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseClass entityDTO)
        {
            throw new NotImplementedException();
        }
    }

}
