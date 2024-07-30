using DataAccess.Dao;
using DTO;
using System.Diagnostics.Metrics;


namespace DataAccess.Mapper
{
    public class ExerciseTypeMapper : ICrudStatements, IObjectMapper

    {

        public List<BaseClass> BuildObjects(List<Dictionary<string, object>> objectRows)
        {
            var list = new List<BaseClass>();
            
            foreach( var row in objectRows)
            {
                var exerciseType = BuildObject(row);
                list.Add(exerciseType);
            }

            return list;
        }

        public BaseClass BuildObject(Dictionary<string, object> result)
        {
            var ExerciseType = new ExerciseType()
            {
                exerciseTypeId = int.Parse(result["exercise_type_id"].ToString()),
                typeName = result["type_name"].ToString(),
            };

            return ExerciseType;
        }



        public SqlOperation GetCreateStatement(BaseClass entityDTO)
        {
            throw new NotImplementedException();
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
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "dbo.sp_getAllExerciseTypes";

            return operation;
        }
        public SqlOperation GetUpdateStatement(BaseClass entityDTO)
        {
            throw new NotImplementedException();
        }
    }
}
