using DTO;
using DataAccess.CRUD;


namespace BL
{
    public class EquipmentManager
    {
        private readonly EquipmentCrudFactory _crudFactory;

        public EquipmentManager()
        {
            _crudFactory = new EquipmentCrudFactory();
        }

        public List<Equipment> GetAllEquipment()
        {
            return _crudFactory.RetrieveAll<Equipment>();
        }

        public void CreateEquipment(Equipment equipment)
        {
            _crudFactory.Create(equipment);
        }

        public void UpdateEquipment(Equipment equipment)
        {
            _crudFactory.Update(equipment);
        }

        public void DeleteEquipment(int id)
        {
            var equipment = new Equipment { EquipmentId = id };
            _crudFactory.Delete(equipment);
        }
    }
}
