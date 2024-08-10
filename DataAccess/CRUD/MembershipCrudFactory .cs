using System.Data;
using System.Data.SqlClient;
using DataAccess.Crud;
using DataAccess.Dao;
using DataAccess.Mapper;
using DTO;
using Microsoft.VisualBasic;

namespace DataAccess.CRUD
{
    public class MembershipCrudFactory : CrudFactory
    {
        private MembershipMapper mapper;

        public MembershipCrudFactory() : base()
        {
            mapper = new MembershipMapper();
            dao = SqlDao.GetInstance();
        }

        public string RegisterMembership(BaseClass entityDTO)
        {
            var errorMessage = new SqlParameter("@errorMessage", SqlDbType.VarChar, 255)
            {
                Direction = ParameterDirection.Output
            };

            SqlOperation operation = mapper.GetCreateStatement(entityDTO, errorMessage);
            dao.ExecuteStoredProcedure(operation);

            string error = errorMessage.Value as string;
            return error;
        }

        public override void Create(BaseClass entityDTO)
        {
            throw new NotImplementedException();
        }

        public override void Update(BaseClass entityDTO)
        {
            throw new NotImplementedException();
        }

        public override void Delete(BaseClass entityDTO)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            SqlOperation operation = mapper.GetRetrieveAllStatement();

            List<Dictionary<string, object>> result = dao.ExecuteStoredProcedureWithQuery(operation);

            List<BaseClass> mappedRoutines = mapper.BuildObjects(result);

            List<T> routineList = new List<T>();

            foreach (var routine in mappedRoutines)
            {
                var convertedRoutine = (T)Convert.ChangeType(routine, typeof(T));
                routineList.Add(convertedRoutine);
            }

            return routineList;
        }

        public override BaseClass RetrieveById(int id)
        {
            SqlOperation operation = mapper.GetRetrieveByIdStatement(id);
          
            Dictionary<string, object> result = dao.ExecuteStoredProcedureWithUniqueResult(operation);
            var Routine = mapper.BuildObject(result);

            return Routine;

        } 
    }
}