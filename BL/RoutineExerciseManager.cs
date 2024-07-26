
using DTO;
using DataAccess.CRUD;

namespace BL
{
    public class RoutineExerciseManager
    {

        public void AddExerciseToRoutine(RoutineExercise routineExercise)
        {
            RoutineExerciseCrudFactory ex_crud = new RoutineExerciseCrudFactory();
            ex_crud.Create(routineExercise);
        }

    }
}