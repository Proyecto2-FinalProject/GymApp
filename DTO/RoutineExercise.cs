
namespace DTO
{
    public class RoutineExercise : BaseClass
    {
        public int routine_exercise_id { get; set; }
        public int routine_id { get; set; }
        public int exercise_id { get; set; }
        public string exercise_type { get; set; }
        public int sets { get; set; }
        public int repetitions { get; set; }
        public decimal weight { get; set; }
        public TimeSpan time_duration { get; set; }
        public TimeSpan amrap_time { get; set; }

    }
}
