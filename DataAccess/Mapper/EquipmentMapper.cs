using DataAccess.Dao;
using DTO;

namespace DataAccess.Mapper
{
    public class EquipmentMapper : ICrudStatements, IObjectMapper
    {
        public List<BaseClass> BuildObjects(List<Dictionary<string, object>> objectRows)
        {
            var list = new List<BaseClass>();

            foreach (var row in objectRows)
            {
                var equipment = BuildObject(row);
                list.Add(equipment);
            }

            return list;
        }

        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            var equipment = new Equipment
            {
                EquipmentId = int.Parse(row["equipment_id"].ToString()),
                Name = row["name"].ToString(),
                Description = row["description"].ToString(),
                Quantity = row.ContainsKey("quantity") && !string.IsNullOrEmpty(row["quantity"].ToString()) ? int.Parse(row["quantity"].ToString()) : 0,
                Status = row["status"].ToString()
            };

            return equipment;
        }

        public SqlOperation GetCreateStatement(BaseClass entity)
        {
            var operation = new SqlOperation
            {
                ProcedureName = "dbo.sp_addEquipment"
            };

            var equipment = (Equipment)entity;
            operation.AddVarcharParam("name", equipment.Name);
            operation.AddVarcharParam("description", equipment.Description);
            operation.AddIntegerParam("quantity", equipment.Quantity);
            operation.AddVarcharParam("status", equipment.Status);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseClass entity)
        {
            var operation = new SqlOperation
            {
                ProcedureName = "dbo.sp_deleteEquipment"
            };

            var equipment = (Equipment)entity;
            operation.AddIntegerParam("equipment_id", equipment.EquipmentId);

            return operation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var operation = new SqlOperation
            {
                ProcedureName = "dbo.sp_getAllEquipment"
            };

            return operation;
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var operation = new SqlOperation
            {
                ProcedureName = "dbo.sp_getEquipment"
            };

            operation.AddIntegerParam("equipment_id", id);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseClass entity)
        {
            var operation = new SqlOperation
            {
                ProcedureName = "dbo.sp_updateEquipment"
            };

            var equipment = (Equipment)entity;
            operation.AddIntegerParam("equipment_id", equipment.EquipmentId);
            operation.AddVarcharParam("name", equipment.Name);
            operation.AddVarcharParam("description", equipment.Description);
            operation.AddIntegerParam("quantity", equipment.Quantity);
            operation.AddVarcharParam("status", equipment.Status);

            return operation;
        }
    }
}
