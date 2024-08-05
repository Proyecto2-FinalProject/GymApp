using DTO;
using DataAccess.CRUD;

namespace BL
{
    public class RoutineResultManager
    {
        public void AddRoutineResults(RoutineResult routineResult)
        {
            RoutineResultCrudFactory ex_crud = new RoutineResultCrudFactory();
            ex_crud.Create(routineResult);
        }

        // Otros métodos como GetRoutineResultById o GetAllRoutineResults pueden ser añadidos aquí si es necesario.
    }
}



