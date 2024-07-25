using DTO;
using DataAccess.CRUD;


namespace BL
{

    // Clase que gestiona las operaciones CRUD para la entidad Equipment.
    public class EquipmentManager
    {
        private readonly EquipmentCrudFactory _crudFactory;

        // Constructor que inicializa la instancia de EquipmentCrudFactory.
        public EquipmentManager()
        {
            _crudFactory = new EquipmentCrudFactory();
        }

        // Método para obtener todos los equipos.
        public List<Equipment> GetAllEquipment()
        {
            return _crudFactory.RetrieveAll<Equipment>();
        }

        // Método para crear un nuevo equipo: recibimos los datos del UI y los pasamos al EquipmentCrudFactory.
        public void CreateEquipment(Equipment equipment)
        {
            _crudFactory.Create(equipment);
        }

        // Método para actualizar un equipo: recibimos los datos del UI y los pasamos al EquipmentCrudFactory.
        public void UpdateEquipment(Equipment equipment)
        {
            _crudFactory.Update(equipment);
        }

        // Método para eliminar un equipo por ID: recibimos el ID del UI y lo pasamos al EquipmentCrudFactory.
        public void DeleteEquipment(int id)
        {
            var equipment = new Equipment { EquipmentId = id };
            _crudFactory.Delete(equipment);
        }
    }
}
