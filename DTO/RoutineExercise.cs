namespace DTO
{
    public class RoutineExercise : BaseClass
    {
        public int RoutineExerciseId { get; set; }
        public int RoutineId { get; set; }
        public int ExerciseId { get; set; }
        public string ExerciseType { get; set; }
        public int? Sets { get; set; }
        public int? Repetitions { get; set; }
        public decimal? Weight { get; set; }
        public TimeSpan? TimeDuration { get; set; }
        public TimeSpan? AmrapTime { get; set; }
    }
}
