using System.Data;
using System.Data.SqlClient;
using DataAccess.Crud;
using DataAccess.Dao;
using DataAccess.Mapper;
using DTO;

namespace DataAccess.CRUD
{
    public class UserCrudFactory : CrudFactory
    {
        private UserMapper mapper;

        public UserCrudFactory() : base()
        {
            mapper = new UserMapper();
            dao = SqlDao.GetInstance();
        }

        public int RegisterUser(BaseClass entityDTO, string hashedPassword)
        {
            var newUserIdParam = new SqlParameter("@NewUserId", SqlDbType.Int)
            {
                Direction = ParameterDirection.Output
            };

            SqlOperation operation = mapper.GetRegisterUser(entityDTO, hashedPassword, newUserIdParam);
            dao.ExecuteStoredProcedure(operation);

            int userId = Convert.ToInt32(newUserIdParam.Value);
            return userId;
        }

        public void RegisterSalt(int userId, string salt)
        {
            SqlOperation operation = mapper.GetRegisterSalt(userId, salt);
            dao.ExecuteStoredProcedure(operation);
        }

        //Este metodo devuelve todo el usuario, se puede reutilizar para otra funcion. 
        public BaseClass RetrieveUserByUsername(string username)
        {
            SqlOperation operation = mapper.GetRetrieveUserByUsername(username);

            Dictionary<string, object> result = dao.ExecuteStoredProcedureWithUniqueResult(operation);
            var user = mapper.BuildObject(result);

            return user;
        }

        public string RetrieveSaltByUserId(int userId)
        {
            SqlOperation operation = mapper.GetRetrieveSaltByUserId(userId);

            Dictionary<string, object> result = dao.ExecuteStoredProcedureWithUniqueResult(operation);

            return result.ContainsKey("salt") ? result["salt"].ToString() : null; 
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
            throw new NotImplementedException();
        }

        public override BaseClass RetrieveById(int id)
        {
            SqlOperation operation = mapper.GetRetrieveByIdStatement(id);

            Dictionary<string, object> result = dao.ExecuteStoredProcedureWithUniqueResult(operation);
            var excercise = mapper.BuildObject(result);
          
            return excercise;
        }

       
    }
}