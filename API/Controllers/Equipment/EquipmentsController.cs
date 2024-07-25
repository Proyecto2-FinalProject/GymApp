using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using DTO;
using BL;



namespace API.Controllers.Equipments
{
    [EnableCors("MyCorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EquipmentsController : Controller
    {
        private readonly EquipmentManager _equipmentManager;

        public EquipmentsController(EquipmentManager equipmentManager)
        {
            _equipmentManager = equipmentManager;
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            // Método para obtener todos los equipos: llamamos a GetAllEquipment del manager y devolvemos la lista
            var equipmentList = _equipmentManager.GetAllEquipment()
                .Select(e => new Equipment
                {
                    EquipmentId = e.EquipmentId,
                    Name = e.Name,
                    Description = e.Description,
                    Quantity = e.Quantity,
                    Status = e.Status
                }).ToList();
            return Ok(equipmentList);
        }

        [HttpPost]
        public ActionResult Create([FromBody] Equipment equipment)
        {
            // Método para crear un nuevo equipo: recibimos los datos del UI y los pasamos al EquipmentManager
            if (equipment == null)
            {
                return BadRequest("Equipment data is null.");
            }

            _equipmentManager.CreateEquipment(equipment);
            return Ok(new { message = "Equipment created successfully" });
        }

        [HttpPost]
        public IActionResult Edit([FromBody] Equipment equipment)
        {
            // Método para actualizar un equipo: recibimos los datos del UI y los pasamos al EquipmentManager
            if (equipment == null)
            {
                return BadRequest("Equipment data is null.");
            }

            _equipmentManager.UpdateEquipment(equipment);
            return Ok(new { message = "Equipment updated successfully" });
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            // Método para eliminar un equipo por ID: recibimos el ID del UI y lo pasamos al EquipmentManager
            _equipmentManager.DeleteEquipment(id);
            return Ok(new { message = "Equipment deleted successfully" });
        }
    }
}
 