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
            _equipmentManager.DeleteEquipment(id);
            return Ok(new { message = "Equipment deleted successfully" });
        }

    }
}
