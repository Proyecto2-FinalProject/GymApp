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
                RoutineExerciseId = int.Parse(row["routine_exercise_id"].ToString()),
                RoutineId = int.Parse(row["routine_id"].ToString()),
                ExerciseId = int.Parse(row["exercise_id"].ToString()),
                ExerciseType = row["exercise_type"].ToString(),
                Sets = row.ContainsKey("sets") ? (int?)int.Parse(row["sets"].ToString()) : null,
                Repetitions = row.ContainsKey("repetitions") ? (int?)int.Parse(row["repetitions"].ToString()) : null,
                Weight = row.ContainsKey("weight") ? (decimal?)decimal.Parse(row["weight"].ToString()) : null,
                TimeDuration = row.ContainsKey("time_duration") ? (TimeSpan?)TimeSpan.Parse(row["time_duration"].ToString()) : null,
                AmrapTime = row.ContainsKey("amrap_time") ? (TimeSpan?)TimeSpan.Parse(row["amrap_time"].ToString()) : null
            };

            return routineExercise;
        }

        public SqlOperation GetCreateStatement(BaseClass entityDTO)
        {
            var operation = new SqlOperation
            {
                ProcedureName = "dbo.sp_addRoutineExercise"
            };

            var routineExercise = (RoutineExercise)entityDTO;

            operation.AddIntegerParam("routine_id", routineExercise.RoutineId);
            operation.AddIntegerParam("exercise_id", routineExercise.ExerciseId);
            operation.AddVarcharParam("exercise_type", routineExercise.ExerciseType);
            operation.AddIntegerParam("sets", routineExercise.Sets);
            operation.AddIntegerParam("repetitions", routineExercise.Repetitions);
            operation.AddDecimalParam("weight", routineExercise.Weight);
            operation.AddTimeSpanParam("time_duration", routineExercise.TimeDuration);
            operation.AddTimeSpanParam("amrap_time", routineExercise.AmrapTime);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseClass entityDTO)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveByIdStatement(int Id)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetUpdateStatement(BaseClass entityDTO)
        {
            throw new NotImplementedException();
        }
    }
}
