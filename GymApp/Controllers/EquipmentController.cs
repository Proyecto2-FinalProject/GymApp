using Microsoft.AspNetCore.Mvc;

namespace GymUI.Controllers
{
    public class EquipmentController : Controller
    {
        // Acción para mostrar la vista de creación de equipo.
        public async Task<IActionResult> Create()
        {
            return View();
        }

        // Acción para mostrar la vista de la lista de equipos.
        public async Task<IActionResult> EquipmentList()
        {
            return View();
        }

        // Acción para mostrar la vista de edición de equipo.
        public async Task<IActionResult> Edit(int id)
        {
            // Aquí puedes agregar lógica para obtener el equipo por ID si es necesario.
            return View();
        }

        // Acción para mostrar la vista de eliminación de equipo.
        public async Task<IActionResult> Delete(int id)
        {
            // Aquí puedes agregar lógica para obtener el equipo por ID si es necesario.
            return View();
        }
    }
}
