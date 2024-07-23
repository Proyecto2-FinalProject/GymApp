using DataAccess.Crud;
using DataAccess.Dao;
using DataAccess.Mapper;
using DTO;


namespace DataAccess.CRUD
{
    public class EquipmentCrudFactory : CrudFactory
    {
        private readonly EquipmentMapper _mapper;

        public EquipmentCrudFactory() : base()
        {
            _mapper = new EquipmentMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseClass entityDTO)
        {
            var operation = _mapper.GetCreateStatement(entityDTO);
            dao.ExecuteStoredProcedure(operation);
        }

        public override void Update(BaseClass entityDTO)
        {
            var operation = _mapper.GetUpdateStatement(entityDTO);
            dao.ExecuteStoredProcedure(operation);
        }

        public override void Delete(BaseClass entityDTO)
        {
            var operation = _mapper.GetDeleteStatement(entityDTO);
            dao.ExecuteStoredProcedure(operation);
        }

        public override List<T> RetrieveAll<T>()
        {
            var operation = _mapper.GetRetrieveAllStatement();
            var result = dao.ExecuteStoredProcedureWithQuery(operation);
            var mappedEquipment = _mapper.BuildObjects(result);
            var equipmentList = new List<T>();

            foreach (var equipment in mappedEquipment)
            {
                var convertedEquipment = (T)Convert.ChangeType(equipment, typeof(T));
                equipmentList.Add(convertedEquipment);
            }

            return equipmentList;
        }

        public override BaseClass RetrieveById(int id)
        {
            var operation = _mapper.GetRetrieveByIdStatement(id);
            var result = dao.ExecuteStoredProcedureWithUniqueResult(operation);
            var equipment = _mapper.BuildObject(result);

            return equipment;
        }
    }
}
