using DataAccess.Dao;
using DataAccess.Mapper;
using DTO;

namespace DataAccess.CRUD
{
    public class RoleCrudFactory
    {
        private readonly RoleMapper _mapper;
        private readonly SqlDao _dao;

        public RoleCrudFactory()
        {
            _mapper = new RoleMapper();
            _dao = SqlDao.GetInstance();
        }

        public Role GetRoleByUserId(int userId)
        {
            SqlOperation operation = _mapper.GetRoleByUserIdOperation(userId);
            Dictionary<string, object> result = _dao.ExecuteStoredProcedureWithUniqueResult(operation);
            return (Role)_mapper.BuildObject(result);
        }
    }
}